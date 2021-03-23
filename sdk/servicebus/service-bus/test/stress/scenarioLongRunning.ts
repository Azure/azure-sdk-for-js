import { hostname } from "os";
import {
  captureConsoleOutputToAppInsights,
  defaultClient,
  SBStressTestsBase
} from "./stressTestsBase";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";
import { v4 as uuidv4 } from "uuid";

captureConsoleOutputToAppInsights();

const stressTest = new SBStressTestsBase({
  testName: "longRunning",
  snapshotFocus: ["send-info", "receive-info"]
});

async function looper(fn: () => Promise<void>, delay: number, abortSignal: AbortSignalLike) {
  const timeout = () => new Promise((resolve) => setTimeout(() => resolve(true), delay));

  while (!abortSignal.aborted && (await timeout())) {
    await fn();
  }
}

async function sendMessagesForever(
  clientForSender: ServiceBusClient,
  abortSignal: AbortSignalLike
) {
  console.log(`Started message sending`);

  let sender: ServiceBusSender | undefined;

  return looper(
    async () => {
      if (abortSignal.aborted) {
        console.log(`Aborting sending because of abortSignal`);
        return;
      }

      try {
        if (sender == null) {
          sender = clientForSender.createSender(stressTest.queueName);
        }

        const messagesToSend = [
          {
            messageId: uuidv4(),
            body: `Message: ${Date.now()}`
          }
        ];

        stressTest.trackSentMessages(messagesToSend);
        await sender.sendMessages(messagesToSend);
      } catch (err) {
        console.log(`Sending message failed: `, err);
        stressTest.trackError("send", err);
        sender = undefined;
      }
    },
    1000,
    abortSignal
  );
}

async function main() {
  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  await stressTest.init();

  console.log(`Starting with hostname ${hostname}`);

  defaultClient.trackEvent({
    name: "ApplicationStart"
  });

  const clientForReceiver = stressTest.createServiceBusClient();

  const receiver = clientForReceiver.createReceiver(stressTest.queueName, {
    receiveMode: "peekLock"
  });

  console.log(`Subscribing...`);

  const subscription = receiver.subscribe(
    {
      processMessage: async (msg) => {
        stressTest.addReceivedMessage([msg]);
        await stressTest.completeMessage(receiver, msg);
      },
      processError: async (args) => {
        console.log(`subscribe error:`, args);
        stressTest.trackError("receive", args.error);
      }
    },
    {
      autoCompleteMessages: false,
      maxConcurrentCalls: 10
    }
  );

  const clientForSender = stressTest.createServiceBusClient();

  await sendMessagesForever(clientForSender, abortSignal);
  defaultClient.flush();

  await subscription.close();
  await clientForReceiver.close();
  await clientForSender.close();

  await stressTest.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
