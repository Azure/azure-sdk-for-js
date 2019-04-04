/*
Test Scenario summary:
Runs following sequence of steps in a long running loop:
Single client is created -> single sender is created ->
message is sent -> message received -> message completed ->
receiver closed -> client closed

The test assumes no other process is working with the queues defined in here,
but the queues must be empty and use default configurations before running the test.

For running this test, connection string of the Service Bus namespace and queue name
must be supplied.
*/

import { ServiceBusClient, SendableMessageInfo, ReceiveMode } from "../../src";

const connectionString = "";
const queueName = "";

const testDurationInMilliseconds = 60000 * 5 * 12 * 24 * 7; // 1 week

let msgId = 1;

let snapshotIntervalID: any;

let isJobDone = false;

async function main(): Promise<void> {
	snapshotIntervalID = setInterval(snapshot, 5000); // Every 5 seconds
	setTimeout(() => {
		isJobDone = true;
	}, testDurationInMilliseconds);

	await sendReceiveMessages();
}

async function sendReceiveMessages(): Promise<void> {
	const ns = ServiceBusClient.createFromConnectionString(connectionString);

	try {
		while (!isJobDone) {
			const client = ns.createQueueClient(queueName);
			const sender = client.createSender();

			const message: SendableMessageInfo = {
				messageId: msgId,
				body: "test",
				label: `${msgId}`
			};
			msgId++;
			await sender.sendMessage(message);
			await sender.close();

			const receiver = await client.createReceiver(ReceiveMode.peekLock);
			const messagesReceived = await receiver.receiveMessages(1);
			await messagesReceived[0].complete();
			await receiver.close();

			await client.close();
		}
	} finally {
		await ns.close();
		clearInterval(snapshotIntervalID);
	}
}

function snapshot(): void {
	console.log("Time : ", new Date());
	console.log("Number of clients opened, closed successfully so far : ", msgId);
	console.log("\n");
}

main().catch((err) => {
	console.log("Error occurred: ", err);
});
