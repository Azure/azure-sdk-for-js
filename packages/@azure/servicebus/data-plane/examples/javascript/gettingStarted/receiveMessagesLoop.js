/*
  This sample demonstrates how the receiveBatch() function can be used to receive Service Bus
  messages in a loop.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { Namespace } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

async function main(){
  const ns = Namespace.createFromConnectionString(connectionString);

  // If using Topics, use createSubscriptionClient to receive from a topic subscription
  const client = ns.createQueueClient(queueName);
  const receiver = client.getReceiver();

  try {
    for (let i = 0; i < 10; i++) {
      const messages = await receiver.receiveBatch(1, 5);
      if (!messages.length) {
        console.log("No more messages to receive");
        break;
      }
      console.log(`Received message #${i}: ${messages[0].body}`);
      await messages[0].complete();
    }
    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
