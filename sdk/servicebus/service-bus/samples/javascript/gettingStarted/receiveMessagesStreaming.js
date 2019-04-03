/*
  This sample demonstrates how the receive() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.js" sample before running this to populate the queue/topic
*/

const { Namespace, delay } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

async function main() {
  const ns = Namespace.createFromConnectionString(connectionString);

  // If using Topics & Subscriptions, use createSubscriptionClient to receive from the subscription
  const client = ns.createQueueClient(queueName);
  
  // To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
  // the sample in sessions.js file
  const receiver = client.getReceiver();

  const onMessageHandler = async (brokeredMessage) => {
    console.log(`Received message: ${brokeredMessage.body}`);
    await brokeredMessage.complete();
  };
  const onErrorHandler = (err) => {
    console.log("Error occurred: ", err);
  };

  try {
    receiver.receive(onMessageHandler, onErrorHandler, { autoComplete: false });

    // Waiting long enough before closing the receiver to receive messages
    await delay(5000);

    await receiver.close();
    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
