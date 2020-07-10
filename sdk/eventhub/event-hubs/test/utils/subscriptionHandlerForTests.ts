// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-amqp";
import chai from "chai";
import {
  CloseReason,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  ReceivedEventData
} from "../../src";
import {
  PartitionContext,
  SubscriptionEventHandlers
} from "../../src/eventHubConsumerClientModels";
import { loggerForTest } from "./logHelpers";
import { loopUntil } from "./testUtils";
const should = chai.should();

export interface HandlerAndPositions {
  startPosition: { [partitionId: string]: EventPosition };
  subscriptionEventHandler: SubscriptionHandlerForTests;
}

export class SubscriptionHandlerForTests implements Required<SubscriptionEventHandlers> {
  private _maxTimeToWaitSeconds = 30;
  private _timeBetweenChecksMs = 1000;

  static async startingFromHere(
    client: EventHubProducerClient | EventHubConsumerClient
  ): Promise<HandlerAndPositions> {
    const partitionIds = await client.getPartitionIds({});
    const startPosition: { [partitionId: string]: EventPosition } = {};

    for (const partitionId of partitionIds) {
      const props = await client.getPartitionProperties(partitionId);
      startPosition[props.partitionId] = {
        sequenceNumber: props.lastEnqueuedSequenceNumber
      };
    }

    return {
      startPosition: startPosition,
      subscriptionEventHandler: new SubscriptionHandlerForTests()
    };
  }

  public data: Map<
    string,
    {
      closeReason?: CloseReason;
      error?: Error;
    }
  > = new Map();

  public events: { partitionId: string; event: ReceivedEventData }[] = [];

  async processInitialize(context: PartitionContext) {
    this.data.set(context.partitionId, {});
  }

  async processClose(reason: CloseReason, context: PartitionContext) {
    this.data.get(context.partitionId)!.closeReason = reason;
  }

  async processEvents(events: ReceivedEventData[], context: PartitionContext) {
    // by default we don't fill out the lastEnqueuedEventInfo field (they have to enable it
    // explicitly in the options for the processor).
    should.not.exist(context.lastEnqueuedEventProperties);

    this.events.push(
      ...events.map((event) => {
        return {
          event,
          partitionId: context.partitionId
        };
      })
    );
  }

  async processError(err: Error, context: PartitionContext) {
    loggerForTest(`Error in partition ${context.partitionId}: ${err}`);
    should.exist(
      context.partitionId,
      `Non-partition level errors should definitely not happen : ${err}`
    );

    if (context.partitionId) {
      this.data.get(context.partitionId)!.error = err;
    }
  }

  async waitUntilInitialized(partitionIds: string[]): Promise<void> {
    await loopUntil({
      name: "waiting until initialized",
      maxTimes: 60,
      timeBetweenRunsMs: 1000,
      until: async () => {
        return this.data.size === partitionIds.length;
      }
    });
  }

  async waitForFullEvents(
    partitionIds: string[],
    countOfExpectedEvents?: number
  ): Promise<{ partitionId: string; event: ReceivedEventData }[]> {
    const startTime = Date.now();

    countOfExpectedEvents = countOfExpectedEvents || partitionIds.length;

    while (true) {
      loggerForTest(`Received ${this.events.length} messages (need ${countOfExpectedEvents})`);

      if (this.events.length !== countOfExpectedEvents && !this.hasErrors(partitionIds)) {
        await delay(this._timeBetweenChecksMs);

        if (Date.now() - startTime > this._maxTimeToWaitSeconds * 1000) {
          throw new Error(
            `Waiting _way_ too long for messages to arrive (got ${this.events.length} out of ${countOfExpectedEvents})`
          );
        }
      } else {
        this.events.sort((a, b) => {
          const akey = `${a.partitionId}:${a.event.body}`;
          const bkey = `${b.partitionId}:${b.event.body}`;
          return akey.localeCompare(bkey);
        });

        return this.events;
      }
    }
  }

  async waitForEvents(
    partitionIds: string[],
    countOfExpectedEvents?: number
  ): Promise<{ partitionId: string; body: string }[]> {
    const events = await this.waitForFullEvents(partitionIds, countOfExpectedEvents);

    return events.map((eventAndPartitionId) => {
      return {
        body: eventAndPartitionId.event.body,
        partitionId: eventAndPartitionId.partitionId
      };
    });
  }

  clear() {
    this.data = new Map();
    this.events = [];
  }

  hasErrors(partitionIds: string[]): boolean {
    for (const partitionId of partitionIds) {
      const possiblePartitionData = this.data.get(partitionId);
      if (possiblePartitionData && possiblePartitionData.error) {
        return true;
      }
    }

    return false;
  }

  allShutdown(partitionIds: string[]): boolean {
    for (const partitionId of partitionIds) {
      if (this.data.get(partitionId)!.closeReason !== CloseReason.Shutdown) {
        return false;
      }
    }

    return true;
  }
}

export async function sendOneMessagePerPartition(
  partitionIds: string[],
  producerClient: EventHubProducerClient
): Promise<{ body: string; partitionId: string }[]> {
  const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
  const sentMessages = [];

  for (const partitionId of partitionIds) {
    const body = expectedMessagePrefix + partitionId;
    await producerClient.sendBatch([{ body }], { partitionId });
    sentMessages.push({
      body,
      partitionId
    });
  }

  return sentMessages;
}
