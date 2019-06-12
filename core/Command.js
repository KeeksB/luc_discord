class Command {
    constructor(client, {
        name = null,
        description = "No description provided.",
        category = "general",
        aliases = new Array(),
        guild = new Array("all"),
        nsfw = false,
        perms_user = new Array(),
        perms_bot = new Array(),
        args_req = 0,
        args_usage = "",
        cooldown = 5
    }) {
        this.client = client;
        this.conf = { name, description, category, aliases, guild, nsfw, perms_user, perms_bot, args_req, args_usage, cooldown };
    }
}

module.exports = Command;