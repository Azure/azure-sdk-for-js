import {
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusSessionReceiver
} from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

interface ScenarioRenewSessionLockOptions {
  testDurationInMs?: number;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  delayBetweenReceivesInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
  /**
   * Default: false
   * Manual autoLockRenewal happens occurs by default
   * If this flag is set to true, manual lock renewal is disabled, related logging is also gone with it
   */
  autoLockRenewal?: boolean;
}

function sanitizeOptions(
  options: ScenarioRenewSessionLockOptions
): Required<ScenarioRenewSessionLockOptions> {
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 100,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
    autoLockRenewal: options.autoLockRenewal || false
  };
}

// TODO: max lock renewal duration to be 70% of testDuration instead of 100%
// TODO: stop sending messages after a 70% of test duration
// TODO: Upon ending max lock renewal duration, pass an option to complete/ignore the message
export async function scenarioRenewSessionLock() {
  const {
    testDurationInMs,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
    autoLockRenewal
  } = sanitizeOptions(parsedArgs<ScenarioRenewSessionLockOptions>(process.argv));

  const testDurationForSendInMs = testDurationInMs * 0.7;
  // Since we are focusing on session locks in this test
  const receiveMode = "receiveAndDelete";

  const startedAt = new Date();

  const stressBase = new SBStressTestsBase({
    snapshotFocus: ["send-info", "receive-info", "session-lock-renewal-info"]
  });

  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init(undefined, { requiresSession: true });
  const sender = sbClient.createSender(stressBase.queueName);
  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (
      elapsedTime < testDurationForSendInMs &&
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
        receiver = await sbClient.createSessionReceiver(stressBase.queueName, {
          receiveMode,
          maxAutoRenewLockDurationInMs: !autoLockRenewal ? 0 : testDurationInMs - elapsedTime
        });
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
        if (!autoLockRenewal) {
          stressBase.renewSessionLockUntil(receiver, testDurationInMs - elapsedTime);
        }
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
