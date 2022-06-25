const { App } = require('@slack/bolt');
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

// Find conversation ID using the conversations.list method
async function findConversation(name) {
    try {
      // Call the conversations.list method using the built-in WebClient
      const result = await app.client.conversations.list();
  
      for (const channel of result.channels) {
        if (channel.name === name) {
          conversationId = channel.id;
  
          // Print result
          console.log("Found conversation ID: " + conversationId);
          // Break from for loop
          getHistory(conversationId)
          break;
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  
  // Find conversation with a specified channel `name`
  findConversation("proj-channel-export");

  async function getHistory(channelId) {
      try {
        let conversationHistory;
        const result = await client.conversations.history({
            channel: channelId
          });
        
          conversationHistory = result.messages;
        
          // Print results
          //console.log(conversationHistory.length + " messages found in " + channelId);
          console.log(conversationHistory)
        }
        catch (error) {
          console.error(error);
      }
  }