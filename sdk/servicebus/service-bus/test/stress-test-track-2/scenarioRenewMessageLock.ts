import { delay, ServiceBusClient } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

interface ScenarioRenewMessageLockOptions {
  testDurationInMs?: number;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  delayBetweenReceivesInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
}

function sanitizeOptions(
  options: ScenarioRenewMessageLockOptions
): Required<ScenarioRenewMessageLockOptions> {
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity
  };
}

export async function main() {
  const {
    testDurationInMs,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend
  } = sanitizeOptions(parsedArgs<ScenarioRenewMessageLockOptions>(process.argv));

  const startedAt = new Date();

  const stressBase = new SBStressTestsBase({
    snapshotFocus: ["send-info", "receive-info", "message-lock-renewal-info"]
  });
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init();
  const sender = sbClient.createSender(stressBase.queueName);
  const receiver = sbClient.createReceiver(stressBase.queueName, { receiveMode: "peekLock" });

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
      const messages = await stressBase.receiveMessages(
        receiver,
        receiveBatchMaxMessageCount,
        receiveBatchMaxWaitTimeInMs
      );
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      messages.map((msg) => stressBase.renewMessageLockUntil(msg, testDurationInMs - elapsedTime));
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
