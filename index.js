const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const token = ""; // Replace with your bot token
const sourceChannelId = ""; // Replace with your source channel ID
const targetChannelId = ""; // Replace with your target channel ID

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  if (message.channel.id !== sourceChannelId) return;

  if (
    message.content.startsWith("/saran") ||
    message.content.startsWith("/lapor")
  ) {
    const command = message.content.split(" ")[0];
    const content = message.content.slice(command.length).trim();
    const targetChannel = client.channels.cache.get(targetChannelId);

    const category = command === "/saran" ? "Saran" : "Lapor";
    const date = new Date().toLocaleDateString();

    const formattedMessage = `${category} ${date}: ${content}`;

    if (targetChannel) {
      targetChannel
        .send({
          content: formattedMessage,
          files: message.attachments.map((attachment) => attachment.url),
        })
        .then(() => {
          message.reply("Your message has been forwarded.");
        })
        .catch((error) => {
          console.error("Error forwarding message:", error);
          message.reply("There was an error forwarding your message.");
        });
    } else {
      console.log("Target channel not found!");
    }
  } else {
    message.reply("Tolong Pilih Category /saran atau /lapor");
  }
});

client.login(token).catch((error) => {
  if (error.message.includes("An invalid token was provided")) {
    console.error("Invalid token provided!");
  } else {
    console.error("An error occurred during login:", error);
  }
});
