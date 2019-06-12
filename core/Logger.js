const chalk = require("chalk");
const moment = require("moment");

class Logger {
    log(content, type = "log") {
        const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;

        switch (type.toLowerCase()) {
            case "log": return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            case "cmd": return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content}`);
            case "err": return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content}`);
            case "wrn": return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content}`);
            default: return this.log(content, "log"); 
        }
    }

    cmd(content) { return this.log(content, "cmd"); }
    warn(content) { return this.log(content, "warn"); }
    error(content) { return this.log(content, "error"); }
};

module.exports = Logger;