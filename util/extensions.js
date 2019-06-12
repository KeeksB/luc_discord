const { Message } = require('discord.js');

module.exports = (client) => {
    Message.prototype.reply = function(content) {
        if (this.channel.type !== "dm")
            return this.channel.send(`<@${this.author.id}> | ${content}`).catch(console.error());
        else
            return this.channel.send(content).catch(console.error());
    };

    Message.prototype.sendAndDelete = function(content, time) {
        this.delete().catch(err => client.logger.error(`[${this.guild.name}] [#${this.channel.name}] Failed to delete message.`));
        this.reply(content).then(sentMessage => sentMessage.delete(time).catch(console.error())).catch(console.error());
    };

    Message.prototype.success = function(content) {
        if (this.channel.type !== "dm")
            return this.channel.send(`<@${this.author.id}> | **✓** | ${content}`).catch(console.error());
        else
            return this.channel.send(content).catch(console.error());
    };

    Message.prototype.failure = function(content) {
        if (this.channel.type !== "dm") 
            return this.channel.send(`<@${this.author.id}> | **✗** | ${content}`).catch(console.error());
        else
            return this.channel.send(content).catch(console.error());
    };

    /*
    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);
    */
    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    String.prototype.toProperCase = function() {
        return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
    };
};