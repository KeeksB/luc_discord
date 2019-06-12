const { RichEmbed } = require("discord.js");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute(guild) {
        this.client.guildConfig.delete(guild.id);
        this.client.logger.log(`Left guild: ${guild.name} (${guild.id})`);
    }
};