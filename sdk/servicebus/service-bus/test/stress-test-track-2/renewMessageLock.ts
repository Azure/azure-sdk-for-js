import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
// TODO: Pass in as args to the file
const testDurationInMilliSeconds = 60 * 60 * 1000; // 60 Minutes
const startedAt = new Date();

export async function main() {
  const stressBase = new SBStressTestsBase();
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init();
  const sender = sbClient.createSender(stressBase.queueName);
  const receiver = sbClient.createReceiver(stressBase.queueName, { receiveMode: "peekLock" });

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

  await stressBase.end();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
