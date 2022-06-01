// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  captureConsoleOutputToAppInsights,
  createServiceBusClient,
  loopForever as loopInfinitely,
  ServiceBusStressTester,
} from "./serviceBusStressTester";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";
import { v4 as uuidv4 } from "uuid";

captureConsoleOutputToAppInsights();

async function sendMessagesForever(
  stressTest: ServiceBusStressTester,
  clientForSender: ServiceBusClient,
  abortSignal: AbortSignalLike
) {
  console.log(`Started message sending`);

  let sender: ServiceBusSender | undefined;

  return loopInfinitely(
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
            body: `Message: ${Date.now()}`,
          },
        ];

        stressTest.trackSentMessages(messagesToSend);
        await sender.sendMessages(messagesToSend);
      } catch (err: any) {
        console.log(`Sending message failed: `, err);
        stressTest.trackError("send", err as Error);
      }
    },
    1000,
    abortSignal
  );
}

async function main() {
  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  const stressTest = new ServiceBusStressTester({
    testName: "longRunning",
    snapshotFocus: ["send-info", "receive-info"],
  });

  const operation = async () => {
    const clientForReceiver = createServiceBusClient();

    const receiver = clientForReceiver.createReceiver(stressTest.queueName, {
      receiveMode: "peekLock",
    });

    console.log(`Receiving...`);

    receiver.subscribe(
      {
        processMessage: async (msg) => {
          stressTest.addReceivedMessage([msg]);
          await stressTest.completeMessage(receiver, msg);
        },
        processError: async (args) => {
          console.log(`subscribe error:`, args);
          stressTest.trackError("receive", args.error);
        },
      },
      {
        autoCompleteMessages: false,
        maxConcurrentCalls: 10,
      }
    );

    const clientForSender = createServiceBusClient();

    await sendMessagesForever(stressTest, clientForSender, abortSignal);
  };

  return stressTest.runStressTest(operation);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
