import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
// Load the .env file if it exists
import * as dotenv from "dotenv";
import { delay } from "rhea-promise";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

// Pass in the following args to the file
// - test duration in minutes (default = 60 min)
// - receiveMode - "peekLock" or "receiveAndDelete" (default = "peekLock")
// - maxMessageCount per receive (default = 10)
// - maxWaitTime per receive in seconds (default = 10 seconds)
// - delay between receives in seconds (default = 0 seconds)
// - number of messages to send in each send (default = 1)
// - delay between sends in seconds (default = 0 seconds)
// - total number of messages to send (default = Infinite... meaning program stops after the specified testDuration)
function getCommandLineInputs() {
  return {
    testDurationInMs: (process.argv[2] ? Number(process.argv[2]) : 60) * 60 * 1000, // Default = 60 minutes
    receiveMode: (process.argv[3] ? process.argv[3] : "peekLock") as
      | "receiveAndDelete"
      | "peekLock",
    receiveBatchMaxMessageCount: process.argv[4] ? Number(process.argv[4]) : 10,
    receiveBatchMaxWaitTimeInMs: process.argv[5] ? Number(process.argv[5]) * 1000 : 10000,
    delayBetweenReceivesInMs: process.argv[6] ? Number(process.argv[6]) * 1000 : 0,
    numberOfMessagesPerSend: process.argv[7] ? Number(process.argv[7]) : 1,
    delayBetweenSendsInMs: process.argv[8] ? Number(process.argv[8]) * 1000 : 0,
    totalNumberOfMessagesToSend: process.argv[9] ? Number(process.argv[9]) : Infinity
  };
}

export async function main() {
  const {
    testDurationInMs,
    receiveMode,
    receiveBatchMaxMessageCount,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend
  } = getCommandLineInputs();
  const startedAt = new Date();

  const stressBase = new SBStressTestsBase();
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init();
  const sender = sbClient.createSender(stressBase.queueName);
  const receiver = sbClient.createReceiver(stressBase.queueName, {});

  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (
      elapsedTime < testDurationInMs &&
      stressBase.messagesSent.length < totalNumberOfMessagesToSend
    ) {
      await stressBase.sendMessages([sender], numberOfMessagesPerSend);
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenSendsInMs);
    }
  }

  async function receiveMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (elapsedTime < testDurationInMs) {
      await stressBase.receiveMessages(receiver, receiveBatchMaxMessageCount);
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenReceivesInMs);
    }
  }

  await Promise.all([sendMessages(), receiveMessages()]);
  await sbClient.close();

  await stressBase.end();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
