import { ServiceBusClient } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

interface ScenarioSimpleSendOptions {
  testDurationInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
}

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

function sanitizeOptions(options: ScenarioSimpleSendOptions): Required<ScenarioSimpleSendOptions> {
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity
  };
}

async function main() {
  const {
    testDurationInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend
  } = sanitizeOptions(parsedArgs<ScenarioSimpleSendOptions>(process.argv));

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
