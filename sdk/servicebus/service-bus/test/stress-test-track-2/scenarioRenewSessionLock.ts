import { ReceiveMode, ServiceBusClient, ServiceBusReceivedMessage } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { ServiceBusSessionReceiver } from "../../src";
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
    receiveMode: options.receiveMode || "receiveAndDelete",
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 100,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity
  };
}

export async function scenarioRenewSessionLock() {
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

  const startedAt = new Date();

  const stressBase = new SBStressTestsBase();
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init(undefined, { requiresSession: true });
  const sender = sbClient.createSender(stressBase.queueName);
  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (
      elapsedTime < testDurationInMs &&
      stressBase.messagesSent.length < totalNumberOfMessagesToSend
    ) {
      await stressBase.sendMessages([sender], numberOfMessagesPerSend, true);
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenSendsInMs);
    }
  }

  let receivers: ServiceBusSessionReceiver<ServiceBusReceivedMessage>[] = [];
  async function receiveMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (elapsedTime < testDurationInMs) {
      let receiver;
      try {
        receiver = await sbClient.createSessionReceiver(
          stressBase.queueName,
          receiveMode === "receiveAndDelete"
            ? {
                receiveMode: "receiveAndDelete"
              }
            : {}
        );
      } catch (error) {
        console.log(error);
      }
      if (receiver) {
        await stressBase.receiveMessages(
          receiver,
          receiveBatchMaxMessageCount,
          receiveBatchMaxWaitTimeInMs
        );
        receivers.push(receiver);
        stressBase.renewSessionLockUntil(receiver, testDurationInMs - elapsedTime);
      }
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenReceivesInMs);
    }
  }

  await Promise.all([sendMessages(), receiveMessages()]);
  await sbClient.close();

  await stressBase.end();
}

scenarioRenewSessionLock().catch((err) => {
  console.log("Error occurred: ", err);
});
