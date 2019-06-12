module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute() {
        this.client.logger.log(`Logged in as ${this.client.user.tag} on ${this.client.guilds.size} guilds`);
        this.client.logger.log(`Serving ${this.client.users.size} users in ${this.client.channels.size} channels`);
        this.client.logger.log("Ready...");

        this.client.user.setStatus("available");

        const updatePresence = () => {
            this.client.user.setActivity(`${process.env.DISCORD_PRESENCE} | ${this.client.defaultConfig.prefix}help`, { type: "WATCHING" })
                .then(() => {
                    this.client.logger.log("Presence Updated");
                })
                .catch(() => { 
                    this.client.logger.error("Failed to update presence!");
                });
            setInterval(updatePresence, 10 * 60 * 1000);
        };
        updatePresence();
    }
};