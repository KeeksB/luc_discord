if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required..");

const DiscordBot = require('./core/DiscordBot')
const client = new DiscordBot();

require("./util/extensions")(client);

client.registerCommands();
client.registerEvents();
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('error', err => client.logger.error(err));
client.on('warn', info => client.logger.warn(info));

process.on('unhandledRejection', err => client.logger.error("Uncaught Promise Error: " + err));
process.on('uncaughtException', err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error("Uncaught Exception: " + errorMsg);
    process.exit(1);
});

