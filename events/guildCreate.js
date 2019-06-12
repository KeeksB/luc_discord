const { RichEmbed } = require("discord.js");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute(guild) {
        this.client.guildConfig.set(guild.id, this.client.defaultConfig);
        this.client.logger.log(`Joined guild: ${guild.name} (${guild.id}) [C: ${guild.channels.size} U: ${guild.memberCount}]`);
    }
};