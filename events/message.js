module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute(message) {
        const guildConf = this.client.guildConfig.get(message.guild.id) || this.client.defaultConfig; 

        if (message.author.bot || !message.guild) return;
        if (!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return;

        // Non Command Responses
        if (message.content === `<@${this.client.user.id}>`)
            return message.reply(`My prefix is: \`${guildConf.prefix}\``);

        // Command Parsing
        if (!message.content.startsWith(guildConf.prefix)) return;
        const args = message.content.slice(guildConf.prefix.length).trim().split(" ");
        const commandName = args.shift().toLowerCase();
        const command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName));

        if (!command || (!command.conf.guild.includes("all") && !command.conf.guild.includes(message.guild.id))) return;

        if (this.client.cooldowns.has(`${message.guild.id}-${message.author.id}`)) {
            if (command.conf.name === this.client.cooldowns.get(`${message.guild.id}-${message.author.id}`))
                return message.failure(`Please wait ${command.conf.cooldown} second${(command.conf.cooldown === 1 ? "" : "s")} before running that command again!`);
        }

        if (command.conf.nsfw && !message.channel.nsfw)
            return message.failure("That command is marked as NSFW. Please run it in an NSFW channel!");

        if (command.conf.perms_user && command.conf.perms_user.legnth > 0) {
            if (!message.member.hasPermission(command.conf.perms_user))
                return message.failure(`You don't have permission to run that command! \`${command.conf.perms_user.join("` `")}\``);
        }

        if (command.conf.perms_bot && command.conf.perms_bot.legnth > 0) {
            if (!message.guild.me.hasPermission(command.conf.perms_bot))
                return message.failure(`I don't have the correct permissions to run that command. Please tell an Administrator! \`${command.conf.perms_bot.join("` `")}\``);
        }

        if (command.conf.args_req > 0 && args.length < command.conf.args_req) {
            if (!command.conf.args_usage || command.conf.args_usage === "")
                return message.failure("You didn't provide enough arguements for that command!");
            else
                return message.failure(`You didn't provide enough arguements for that command! Correct Usage: \`${guildConf.prefix}${command.conf.name} ${command.conf.args_usage}\``);
        }
        
        command.execute(message, args);
        this.client.logger.cmd(`[${message.guild.name}] [#${message.channel.name}] (${message.author.username}) ${message.content}`);

        this.client.cooldowns.set(`${message.guild.id}-${message.author.id}`, command.conf.name);
        setTimeout(() => { 
            this.client.cooldowns.delete(`${message.guild.id}-${message.author.id}`);
        }, command.conf.cooldown * 1000);
    }
};