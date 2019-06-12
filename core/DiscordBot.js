const { Client, Collection } = require('discord.js');
const Enmap = require('enmap');
const Logger = require('../core/Logger');
const fs = require('fs');

class DiscordBot extends Client {
    constructor(options) {
        super(options);
        this.logger = new Logger();
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        this.guildConfig = new Enmap({name: "guildConfig", fetchAll: false, autoFetch: true, cloneLevel: 'deep'});
        this.defaultConfig = {
            prefix: ';',
            logChannel: 'server-logs',
            modLogChannel: 'mod-logs',
            modRole: 'Discord Mod',
            adminRole: 'Discord Admin',
            welcomeChannel: 'welcome-disabled',
            welcomeMessage: 'Welcome to the community {{user}}!'
        };
    }  

    registerCommands() {
        try {
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

            for (const commandFile of commandFiles) {
                const command = new (require(`../commands/${commandFile}`))(this);

                this.commands.set(command.conf.name, command);

                for (const alias of command.conf.aliases) {
                    this.aliases.set(alias, command.conf.name);
                }
            }

            return this.logger.log(`Registered ${this.commands.size} commands (${this.aliases.size} aliases)`);
        } catch (err) {
            return this.logger.error(`Failed to register commands: ${err}`);
        }
    }

    registerEvents() {
        try {
            const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

            for (const eventFile of eventFiles) {
                const event = new (require(`../events/${eventFile}`))(this);
                const eventName = eventFile.split(".")[0];

                this.on(eventName, (...args) => event.execute(...args));
            }

            return this.logger.log(`Registered ${eventFiles.length} event files`);
        } catch (err) {
            return this.logger.error(`Failed to register events: ${err}`);
        }
    }
};

module.exports = DiscordBot;