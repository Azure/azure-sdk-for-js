import { ServiceBusClient } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
// Load the .env file if it exists
import * as dotenv from "dotenv";
import { delay } from "rhea-promise";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
// Pass in the following args to the file
// - test duration in minutes (default = 60 min)
// - number of messages to send in each send (default = 1)
// - delay between sends in seconds (default = 0 seconds)
// - total number of messages to send (default = Infinite... meaning program stops after the specified testDuration)

function getCommandLineInputs() {
  return {
    testDurationInMs: (process.argv[2] ? Number(process.argv[2]) : 60) * 60 * 1000, // Default = 60 minutes
    numberOfMessagesPerSend: process.argv[3] ? Number(process.argv[3]) : 1,
    delayBetweenSendsInMs: process.argv[4] ? Number(process.argv[4]) * 1000 : 0,
    totalNumberOfMessagesToSend: process.argv[5] ? Number(process.argv[5]) : Infinity
  };
}

async function main() {
  const {
    testDurationInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend
  } = getCommandLineInputs();

  const stressBase = new SBStressTestsBase();
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init();
  const sender = sbClient.createSender(stressBase.queueName);

  const startedAt = new Date();
  let elapsedTime = 0;
  while (
    elapsedTime < testDurationInMs &&
    stressBase.messagesSent.length < totalNumberOfMessagesToSend
  ) {
    await stressBase.sendMessages([sender], numberOfMessagesPerSend);
    elapsedTime = new Date().valueOf() - startedAt.valueOf();
    await delay(delayBetweenSendsInMs);
  }

  await sbClient.close();
  await stressBase.end();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
