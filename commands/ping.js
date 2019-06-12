const Command = require("../core/Command");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Pongs your ping with some latency info!",
            category: "misc",
            aliases: ["pong"]
        });
    }

    async execute(message, args) {
        const pingMessage = await message.channel.send("🏓 ***Pong..***");
        pingMessage.edit(`🏓 ***Pong..*** Roundtrip took \`${pingMessage.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(this.client.ping)}ms\``).catch(console.error());
    }
}

module.exports = Ping;