const { RichEmbed } = require("discord.js");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute(member) {
        const guildConf = this.client.guildConfig.get(member.guild.id) || this.client.defaultConfig; 

        const logChannel = member.guild.channels.find(channel => channel.name === guildConf.logChannel);
        if (logChannel) {
            const logEmbed = new RichEmbed()
                .setColor(process.env.FAILURE_COLOR)
                .setAuthor(`${member.user.username}#${member.user.discriminator} (${member.id})`, member.user.displayAvatarUrl)
                .setFooter("Left Server")
                .setTimestamp();

            logChannel.send({ embed: logEmbed }).catch((err) => {
                this.client.logger.error(`Couldn't send user leave update to guild log channel: ${err.message}`);
            });
        }
    }
};