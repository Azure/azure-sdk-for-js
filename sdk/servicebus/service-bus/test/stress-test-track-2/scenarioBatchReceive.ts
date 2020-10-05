import {
  ReceiveMode,
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusReceiver
} from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

interface ScenarioReceiveBatchOptions {
  testDurationInMs?: number;
  receiveMode?: ReceiveMode;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  delayBetweenReceivesInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
}

function sanitizeOptions(
  options: ScenarioReceiveBatchOptions
): Required<ScenarioReceiveBatchOptions> {
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveMode: (options.receiveMode as ReceiveMode) || "peekLock",
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity
  };
}

export async function scenarioReceiveBatch() {
  const {
    testDurationInMs,
    receiveMode,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend
  } = sanitizeOptions(parsedArgs<ScenarioReceiveBatchOptions>(process.argv));

  // Sending stops after 70% of total duration to give the receiver a chance to clean up and receive all the messages
  const testDurationForSendInMs = testDurationInMs * 0.7;

  const startedAt = new Date();

  const stressBase = new SBStressTestsBase({
    snapshotFocus: ["send-info", "receive-info"]
  });
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init();
  const sender = sbClient.createSender(stressBase.queueName);
  let receiver: ServiceBusReceiver<ServiceBusReceivedMessage>;

  if (receiveMode === "receiveAndDelete") {
    receiver = sbClient.createReceiver(stressBase.queueName, {
      receiveMode: "receiveAndDelete"
    });
  } else {
    receiver = sbClient.createReceiver(stressBase.queueName);
  }

  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (
      elapsedTime < testDurationForSendInMs &&
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
      await stressBase.receiveMessages(
        receiver,
        receiveBatchMaxMessageCount,
        receiveBatchMaxWaitTimeInMs
      );
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenReceivesInMs);
    }
  }

  await Promise.all([sendMessages(), receiveMessages()]);
  await sbClient.close();

  await stressBase.end();
}

scenarioReceiveBatch().catch((err) => {
  console.log("Error occurred: ", err);
});
