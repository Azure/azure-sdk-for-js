/*
  This sample demonstrates how the receive() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

import { OnMessage, OnError, delay, ServiceBusClient, ReceiveMode } from "../../../src";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

async function main(): Promise<void> {
	const ns = ServiceBusClient.createFromConnectionString(connectionString);

	// If using Topics & Subscriptions, use createSubscriptionClient to receive from the subscription
	const client = ns.createQueueClient(queueName);

	// To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
	// the sample in sessions.ts file
	const receiver = await client.createReceiver(ReceiveMode.peekLock);

	const onMessageHandler: OnMessage = async (brokeredMessage) => {
		console.log(`Received message: ${brokeredMessage.body}`);
		await brokeredMessage.complete();
	};
	const onErrorHandler: OnError = (err) => {
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
