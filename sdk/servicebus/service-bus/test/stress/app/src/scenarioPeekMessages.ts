import {
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
} from "@azure/service-bus";
import { ServiceBusStressTester } from "./serviceBusStressTester";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

interface ScenarioPeekMessagesOptions {
  testDurationInMs?: number;
  peekMaxMessageCount?: number;
  delayBetweenPeeksInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
}

function sanitizeOptions(
  options: ScenarioPeekMessagesOptions
): Required<ScenarioPeekMessagesOptions> {
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    peekMaxMessageCount: options.peekMaxMessageCount || 10,
    delayBetweenPeeksInMs: options.delayBetweenPeeksInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
  };
}

export async function scenarioPeekMessages() {
  const testOptions = sanitizeOptions(parsedArgs<ScenarioPeekMessagesOptions>(process.argv));

  const {
    testDurationInMs,
    peekMaxMessageCount,
    delayBetweenPeeksInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
  } = testOptions;

  // Sending stops after 70% of total duration to give the receiver a chance to clean up and receive all the messages
  const testDurationForSendInMs = testDurationInMs * 0.7;

  const startedAt = new Date();

  const stressBase = new ServiceBusStressTester({
    testName: "peekMessages",
    snapshotFocus: ["send-info", "receive-info"],
  });

  const operation = async (sbClient: ServiceBusClient) => {
    const sender = sbClient.createSender(stressBase.queueName);
    let receiver: ServiceBusReceiver;

    receiver = sbClient.createReceiver(stressBase.queueName, {
      receiveMode: "receiveAndDelete",
    });
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

    async function peekMessages() {
      let elapsedTime = new Date().valueOf() - startedAt.valueOf();
      let fromSequenceNumber = undefined;
      while (elapsedTime < testDurationInMs) {
        const peekedMessages: ServiceBusReceivedMessage[] = await stressBase.peekMessages(
          receiver,
          peekMaxMessageCount,
          fromSequenceNumber
        );
        elapsedTime = new Date().valueOf() - startedAt.valueOf();
        const numberOfMessages = peekedMessages.length;
        fromSequenceNumber =
          numberOfMessages > 0 ? peekedMessages[numberOfMessages - 1].sequenceNumber : undefined;
        await delay(delayBetweenPeeksInMs);
      }
    }

    await Promise.all([sendMessages(), peekMessages()]);
  };

  return stressBase.runStressTest(operation, {
    additionalEventProperties: testOptions,
  });
}

scenarioPeekMessages().catch((err) => {
  console.log("Error occurred: ", err);
});
