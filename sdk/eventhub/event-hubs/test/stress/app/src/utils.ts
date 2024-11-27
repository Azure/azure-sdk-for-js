// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-amqp";
import {
  EventHubConsumerClientOptions,
  EventHubConsumerClient,
  EventHubClientOptions,
  EventHubProducerClient,
} from "@azure/event-hubs";

export interface SnapshotOptions {
  /**
   * The name of this test. Used when reporting telemetry in customDimensions['testName'].
   */
  testName: string;
  snapshotIntervalInMs?: number;
  /**
   * Snapshot information is automatically sent to Azure Monitor.
   * This allows you also print the same information to the console.
   *
   * Disabled by default.
   */
  writeSnapshotInfoToConsole?: boolean;
}

/**
 * Loops infinitely with a delay between invocations.
 */
export async function loopForever(
  fn: () => Promise<void>,
  duration: number,
  abortSignal?: AbortSignalLike,
) {
  while (!abortSignal?.aborted) {
    await delay(duration);
    await fn();
  }
}

export function createEventHubsConsumerClient(
  options?: EventHubConsumerClientOptions,
): EventHubConsumerClient {
  const consumerGroup = process.env.EVENTHUBS_CONSUMER_GROUP || "$Default";
  const connectionString = process.env.EVENTHUBS_CONNECTION_STRING;
  const hubName = process.env.EVENTHUB_NAME;
  if (!connectionString || !consumerGroup || !hubName) {
    throw new Error(
      "EVENTHUBS_CONNECTION_STRING, EVENTHUB_NAME and EVENTHUBS_CONSUMER_GROUP have to be populated in the environment and are not!",
    );
  }
  return new EventHubConsumerClient(consumerGroup, connectionString, hubName, options);
}

export function createEventHubsProducerClient(
  options?: EventHubClientOptions,
): EventHubProducerClient {
  const eventHubName = process.env.EVENTHUB_NAME;
  const connectionString = process.env.EVENTHUBS_CONNECTION_STRING;

  if (!connectionString || !eventHubName) {
    throw new Error(
      "EVENTHUBS_CONNECTION_STRING and EVENTHUB_NAME have to be populated in the environment and are not!",
    );
  }

  return new EventHubProducerClient(connectionString, eventHubName, options);
}
