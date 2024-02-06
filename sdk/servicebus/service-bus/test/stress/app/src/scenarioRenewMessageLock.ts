import { delay, ServiceBusClient } from "@azure/service-bus";
import { ServiceBusStressTester } from "./serviceBusStressTester";
import parsedArgs from "minimist";

interface ScenarioRenewMessageLockOptions {
  testDurationInMs?: number;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  delayBetweenReceivesInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
  completeMessageAfterDuration?: boolean;
}

function sanitizeOptions(args: string[]): Required<ScenarioRenewMessageLockOptions> {
  const options = parsedArgs<ScenarioRenewMessageLockOptions>(args, {
    boolean: ["completeMessageAfterDuration"],
    default: { completeMessageAfterDuration: true },
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
    completeMessageAfterDuration: !!options.completeMessageAfterDuration,
  };
}

export async function main() {
  const testOptions = sanitizeOptions(process.argv);

  const {
    testDurationInMs,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
    completeMessageAfterDuration,
  } = testOptions;

  const testDurationForSendInMs = testDurationInMs * 0.7;
  // TODO: Randomize the duration to renew locks
  const testDurationForLockRenewalInMs = testDurationInMs * 0.5;

  const startedAt = new Date();

  const stressBase = new ServiceBusStressTester({
    testName: "renewMessageLock",
    snapshotFocus: ["send-info", "receive-info", "message-lock-renewal-info"],
  });

  const operation = async (sbClient: ServiceBusClient) => {
    const sender = sbClient.createSender(stressBase.queueName);
    const receiver = sbClient.createReceiver(stressBase.queueName, { receiveMode: "peekLock" });

    async function sendMessages() {
      let elapsedTime = new Date().valueOf() - startedAt.valueOf();
      while (
        elapsedTime < testDurationForSendInMs &&
        stressBase.numMessagesSent() < totalNumberOfMessagesToSend
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
        messages.map((msg) =>
          stressBase.renewMessageLockUntil(
            msg,
            receiver,
            testDurationForLockRenewalInMs - elapsedTime,
            completeMessageAfterDuration
          )
        );
        await delay(delayBetweenReceivesInMs);
      }
    }

    await Promise.all([sendMessages(), receiveMessages()]);
  };

  return stressBase.runStressTest(operation, {
    additionalEventProperties: testOptions,
  });
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
