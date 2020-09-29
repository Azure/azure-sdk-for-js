import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "partitioned-queue";
// TODO: Pass in as args to the file
const testDurationInMilliSeconds = 60 * 60 * 1000; // 60 Minutes
const startedAt = new Date();

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);
  const receiver = sbClient.createReceiver(queueName, { receiveMode: "peekLock" });
  const stressBase = new SBStressTestsBase();

  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (elapsedTime < testDurationInMilliSeconds && stressBase.numberOfSuccessfulSends < 1000) {
      // TODO: args for number of messages to send at a time
      // TODO: args to set max total number of messages to send
      await stressBase.sendMessages([sender], 1);
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
    }
  }

  async function receiveMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (elapsedTime < testDurationInMilliSeconds) {
      // TODO: args for maxMessageCount
      const messages = await stressBase.receiveMessages(receiver);
      messages.map(async (msg) => await stressBase.renewMessageLock(msg));
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
    }
  }

  await Promise.all([sendMessages(), receiveMessages()]);
  await sbClient.close();

  stressBase.end();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
