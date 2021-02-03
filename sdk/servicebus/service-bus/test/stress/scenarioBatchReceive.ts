import {
  ServiceBusClient,
  ServiceBusReceiver,
  ServiceBusReceiverOptions
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
  receiveMode?: ServiceBusReceiverOptions["receiveMode"];
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  delayBetweenReceivesInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
  /**
   * If set to true, `totalNumberOfMessagesToSend` number of messages will be sent before triggering receive.
   */
  sendAllMessagesBeforeReceiveStarts?: boolean;
  numberOfParallelSends?: number;
  maxAutoLockRenewalDurationInMs?: number;
  settleMessageOnReceive: boolean;
}

function sanitizeOptions(args: string[]): Required<ScenarioReceiveBatchOptions> {
  const options = parsedArgs<ScenarioReceiveBatchOptions>(args, {
    boolean: ["settleMessageOnReceive", "sendAllMessagesBeforeReceiveStarts"],
    default: { settleMessageOnReceive: false, sendAllMessagesBeforeReceiveStarts: false }
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveMode: options.receiveMode || "peekLock",
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
    sendAllMessagesBeforeReceiveStarts: options.sendAllMessagesBeforeReceiveStarts,
    maxAutoLockRenewalDurationInMs: options.maxAutoLockRenewalDurationInMs || 0, // 0 = disabled
    settleMessageOnReceive: options.settleMessageOnReceive,
    numberOfParallelSends: options.numberOfParallelSends || 5
  };
}

export async function scenarioReceiveBatch() {
  const testOptions = sanitizeOptions(process.argv);
  let {
    testDurationInMs,
    receiveMode,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
    maxAutoLockRenewalDurationInMs,
    settleMessageOnReceive,
    sendAllMessagesBeforeReceiveStarts,
    numberOfParallelSends
  } = testOptions;

  // Sending stops after 70% of total duration to give the receiver a chance to clean up and receive all the messages
  const testDurationForSendInMs = testDurationInMs * 0.7;

  const startedAt = new Date();

  const stressBase = new SBStressTestsBase({
    testName: "batchAndReceive",
    snapshotFocus: ["send-info", "receive-info"]
  });
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init(undefined, undefined, testOptions);
  const sender = sbClient.createSender(stressBase.queueName);
  let receiver: ServiceBusReceiver;

  if (receiveMode === "receiveAndDelete") {
    receiver = sbClient.createReceiver(stressBase.queueName, {
      receiveMode: "receiveAndDelete",
      maxAutoLockRenewalDurationInMs
    });
  } else {
    receiver = sbClient.createReceiver(stressBase.queueName, { maxAutoLockRenewalDurationInMs });
  }

  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (
      elapsedTime < testDurationForSendInMs &&
      stressBase.messagesSent.length < totalNumberOfMessagesToSend
    ) {
      await stressBase.sendMessages(
        new Array(numberOfParallelSends).fill(sender),
        numberOfMessagesPerSend
      );
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
        receiveBatchMaxWaitTimeInMs,
        settleMessageOnReceive
      );
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenReceivesInMs);
    }
  }

  if (sendAllMessagesBeforeReceiveStarts) {
    await sendMessages();
  }
  await Promise.all(
    (!sendAllMessagesBeforeReceiveStarts ? [sendMessages()] : []).concat(receiveMessages())
  );
  await sbClient.close();

  await stressBase.end();
}

scenarioReceiveBatch().catch((err) => {
  console.log("Error occurred: ", err);
});
