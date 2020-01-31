// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { EventHubProducerClient, EventData, CreateBatchOptions, EventDataBatch } from "../../src";

export async function sendMessagesToPartitionForTest(
  partitionId: string,
  messageOrEventDataOrEventDataArray: string | EventData | EventData[],
  producerClient: EventHubProducerClient
) {
  const batch = await createBatchForTests(
    { partitionId },
    messageOrEventDataOrEventDataArray,
    producerClient
  );
  return producerClient.sendBatch(batch);
}

export async function createBatchForTests(
  createBatchOptions: CreateBatchOptions,
  messageOrEventDataOrEventDataArray: string | EventData | EventData[],
  producerClient: EventHubProducerClient
): Promise<EventDataBatch> {
  const batch = await producerClient.createBatch(createBatchOptions);
  const events: EventData[] = [];

  if (typeof messageOrEventDataOrEventDataArray === "string") {
    events.push({ body: messageOrEventDataOrEventDataArray });
  } else if (Array.isArray(messageOrEventDataOrEventDataArray)) {
    events.push(...messageOrEventDataOrEventDataArray);
  } else {
    events.push(messageOrEventDataOrEventDataArray);
  }

  for (const event of events) {
    if (!batch.tryAdd(event)) {
      throw new Error("Failed to add message to batch (probably too large)");
    }
  }

  return batch;
}
