import { SubscriptionEventHandlers, InitializationContext, PartitionContext } from '../../src/eventHubConsumerClientModels';
import { EventHubConsumerClient } from '../../src/eventHubConsumerClient';
import { EventHubProducerClient } from '../../src/eventHubProducerClient';
import { EventHubClient } from '../../src/impl/eventHubClient';
import { CloseReason, EventPosition, ReceivedEventData } from '../../src';
import { loggerForTest } from './logHelpers';
import { PartitionContextError } from '../../src/eventProcessor';
import { loopUntil } from './testUtils';
import { delay } from '@azure/core-amqp';
import chai from "chai";
const should = chai.should();

export type SequenceNumberMap = Map<string, number>;

export class SubscriptionHandlerForTests implements Required<SubscriptionEventHandlers> {
  maxTimeToWaitSeconds = 120;

  constructor(private _initialSequenceNumbers?: SequenceNumberMap) {
  }

  static async startingFromHere(client: EventHubClient | EventHubProducerClient | EventHubConsumerClient) {
    const partitionIds = await client.getPartitionIds({});

    const sequenceNumbers = new Map<string, number>();

    for (const partitionId of partitionIds) {
      const props = await client.getPartitionProperties(partitionId);
      sequenceNumbers.set(props.partitionId, props.lastEnqueuedSequenceNumber);
    }

    return new SubscriptionHandlerForTests(sequenceNumbers);
  }

  public data: Map<string, {
    closeReason?: CloseReason;
    error?: Error;
  }> = new Map();

  public events: { partitionId: string, body: string }[] = [];

  async processInitialize(context: InitializationContext) {
    this.data.set(context.partitionId, {});

    let startPosition = EventPosition.latest();

    if (this._initialSequenceNumbers && this._initialSequenceNumbers.get(context.partitionId)) {
      const sequenceNumber = this._initialSequenceNumbers.get(context.partitionId)!;
      loggerForTest(`Overriding initial event position for partition ${context.partitionId} with ${sequenceNumber}`);
      startPosition = EventPosition.fromSequenceNumber(sequenceNumber, false);
    }

    context.setStartPosition(startPosition);
  }

  async processClose(reason: CloseReason, context: PartitionContext) {
    this.data.get(context.partitionId)!.closeReason = reason;
  }

  async processEvent(event: ReceivedEventData, context: PartitionContext) {
    // by default we don't fill out the lastEnqueuedEventInfo field (they have to enable it
    // explicitly in the options for the processor).
    should.not.exist(context.lastEnqueuedEventProperties);

    this.events.push({
      body: event.body,
      partitionId: context.partitionId
    });
  }
  async processError(err: Error, context: PartitionContextError) {
    loggerForTest(`Error in partition ${context.partitionId}: ${err}`)
    should.exist(context.partitionId, `Non-partition level errors should definitely not happen : ${err}`);

    if (context.partitionId) {
      this.data.get(context.partitionId)!.error = err;
    }
  }

  async waitUntilInitialized(partitionIds: string[]): Promise<void> {
    await loopUntil({
      name: "waiting until initialized",
      maxTimes: 60,
      timeBetweenRunsMs: 1000,
      until: async () => { return this.data.size === partitionIds.length }
    });
  }

  async waitForEvents(partitionIds: string[]): Promise<{ partitionId: string, body: string }[]>{
    const startTime = Date.now();

    // wait until all partitions have received at least 1 event
    while (true) {
      if (this.events.length !== partitionIds.length && !this.hasErrors(partitionIds)) {
        await delay(100);

        if ((Date.now() - startTime) > this.maxTimeToWaitSeconds * 1000) {
          throw new Error("Waiting _way_ too long in initialize");
        }
      } else {
        // sort for simpler comparisons in our tests
        this.events.sort((a, b) => {
          const akey = `${a.partitionId}:${a.body}`;
          const bkey = `${b.partitionId}:${b.body}`;
          return akey.localeCompare(bkey);
        })

        return this.events;
      }
    }
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

export async function sendOneMessagePerPartition(partitionIds: string[], client: EventHubClient): Promise<{ body: string, partitionId: string}[]>{
  const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
  const sentMessages = [];

  for (const partitionId of partitionIds) {
    const producer = client.createProducer({ partitionId });
    const body = expectedMessagePrefix + partitionId;
    await producer.send({ body });
    await producer.close();
    sentMessages.push({
      body,
      partitionId
    });
  }

  return sentMessages;
}
