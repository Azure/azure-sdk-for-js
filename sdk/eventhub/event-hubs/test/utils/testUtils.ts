// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  Subscription,
} from "../../src/index.js";
import { delay } from "@azure/core-amqp";
import { loggerForTest } from "./logHelpers.js";

export async function getSubscriptionPromise(client: EventHubConsumerClient): Promise<void> {
  let subscription: Subscription;
  return new Promise<void>((resolve, reject) => {
    subscription = client.subscribe({
      processEvents: async () => {
        resolve();
      },
      processError: async (err) => {
        reject(err);
      },
    });
  }).finally(() => subscription.close());
}

export async function loopUntil(args: {
  name: string;
  timeBetweenRunsMs: number;
  maxTimes: number;
  until: () => Promise<boolean>;
  errorMessageFn?: () => string;
}): Promise<void> {
  for (let i = 0; i < args.maxTimes + 1; ++i) {
    const finished = await args.until();

    if (finished) {
      return;
    }

    loggerForTest(`[${args.name}: delaying for ${args.timeBetweenRunsMs}ms]`);
    await delay(args.timeBetweenRunsMs);
  }

  throw new Error(
    `Waited way too long for ${args.name}: ${args.errorMessageFn ? args.errorMessageFn() : ""}`,
  );
}

export async function getStartingPositionsForTests(
  client: Pick<
    EventHubConsumerClient | EventHubProducerClient,
    "getPartitionProperties" | "getEventHubProperties"
  >,
): Promise<{ [partitionId: string]: EventPosition }> {
  const eventHubProperties = await client.getEventHubProperties();

  const startingPositions: { [partitionId: string]: EventPosition } = {};

  for (const partitionId of eventHubProperties.partitionIds) {
    startingPositions[partitionId] = {
      sequenceNumber: (await client.getPartitionProperties(partitionId)).lastEnqueuedSequenceNumber,
    };
  }

  return startingPositions;
}
