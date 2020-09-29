import { ServiceBusClient } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "partitioned-queue";
// TODO: Pass in as args to the file
const testDurationInMilliSeconds = 60 * 60 * 1000; // 60 Minutes

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  const sender = sbClient.createSender(queueName);

  const stressBase = new SBStressTestsBase();
  const startedAt = new Date();
  let elapsedTime = new Date().valueOf() - startedAt.valueOf();

  while (elapsedTime < testDurationInMilliSeconds) {
    // TODO: args for number of messages to send
    await stressBase.sendMessages([sender], 1);
    elapsedTime = new Date().valueOf() - startedAt.valueOf();
  }

  await sbClient.close();

  stressBase.end();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
