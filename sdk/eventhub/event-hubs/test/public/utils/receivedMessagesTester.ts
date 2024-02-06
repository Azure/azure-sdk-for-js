// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CloseReason, EventHubProducerClient, ReceivedEventData } from "../../../src";
import { PartitionContext, SubscriptionEventHandlers } from "../../../src";
import chai from "chai";
import { delay } from "@azure/core-amqp";

const should = chai.should();

interface ReceivedMessages {
  closeReason?: CloseReason;
  lastError?: Error;
}

/**
 * A simple tester that lets you easily poll for messages and check that they've
 * all been received at least once.
 */
export class ReceivedMessagesTester implements Required<SubscriptionEventHandlers> {
  private data: Map<string, ReceivedMessages>;
  private expectedMessageBodies: Set<string>;
  public done: boolean;

  /**
   * Creates a ReceivedMessagesTester
   *
   * @param expectedPartitions - The only partitions we expect to see messages from.
   * @param expectedMessageBodies - The message bodies we expect to get at least once.
   * @param multipleConsumers - If you're running a test that involves multiple consumers there
   *                      will be errors as they balance. Set this to true to be less picky
   *                      about errors that occur and concentrate on making sure all expected
   *                      messages are received at least once.
   */
  constructor(private expectedPartitions: string[], private multipleConsumers: boolean) {
    this.data = new Map<string, ReceivedMessages>();
    this.expectedMessageBodies = new Set();
    this.done = false;
  }

  async processEvents(events: ReceivedEventData[], context: PartitionContext): Promise<void> {
    this.contextIsOk(context);
    for (const event of events) {
      await context.updateCheckpoint(event);
      this.expectedMessageBodies.delete(event.body);
    }

    if (this.expectedMessageBodies.size === 0) {
      this.done = true;
    }
  }

  async processError(error: Error, context: PartitionContext): Promise<void> {
    this.contextIsOk(context);

    // this can happen when multiple consumers are spinning up and load balancing. We'll ignore it for multi-consumers
    // only.
    if (this.multipleConsumers && (error as any).code === "ReceiverDisconnectedError") {
      return;
    }

    // partitionId can be undefined in cases where the error is not partition specific - these are typically "system"
    // level errors and should be considered a fatal error for our tests
    should.exist(
      context.partitionId,
      `Non-partition level errors should definitely not happen : ${error}`
    );

    if (context.partitionId) {
      const receivedData = this.get(context.partitionId);
      receivedData.lastError = error;
    }
  }

  async processInitialize(context: PartitionContext): Promise<void> {
    this.contextIsOk(context);

    if (!this.multipleConsumers) {
      // this'll happen because for our multi-consumer tests we share the same
      // tester (to make sure that all messages have been received)
      //
      // So it's okay that initialize is called more than once per partition
      // in that case since the consumers, for a short time, can overlap as
      // load balancing occurs.
      should.equal(this.data.has(context.partitionId), false);
    }

    this.data.set(context.partitionId, {
      closeReason: undefined,
    });
  }

  async processClose(reason: CloseReason, context: PartitionContext): Promise<void> {
    this.contextIsOk(context);

    const receivedData = this.get(context.partitionId);
    receivedData.closeReason = reason;
  }

  /**
   * Polls until all messages have been received (or until first error)
   */
  async runTestAndPoll(client: EventHubProducerClient): Promise<void> {
    // wait until all the partitions have been claimed
    while (this.data.size !== this.expectedPartitions.length) {
      await delay(1000);
    }

    let lastExpectedMessageCount = await this.produceMessages(client);

    while (!this.done) {
      for (const data of this.data) {
        if (data[1].lastError) {
          throw data[1].lastError;
        }
      }

      if (lastExpectedMessageCount !== this.expectedMessageBodies.size) {
        lastExpectedMessageCount = this.expectedMessageBodies.size;
      }

      await delay(1000);
    }

    if (this.expectedMessageBodies.size > 0) {
      throw new Error(`Never got these messages: ${Array.from(this.expectedMessageBodies)}`);
    }
  }

  private async produceMessages(client: EventHubProducerClient): Promise<number> {
    const expectedMessagePrefix = `EventHubConsumerClient test - ${Date.now().toString()}`;
    const messagesToSend = [];

    for (const partitionId of this.expectedPartitions) {
      const body = `${expectedMessagePrefix} - ${partitionId}`;
      this.expectedMessageBodies.add(body);
      messagesToSend.push({
        body,
        partitionId,
      });
    }

    const lastExpectedMessageCount = this.expectedMessageBodies.size;

    for (const messageToSend of messagesToSend) {
      const batch = await client.createBatch({ partitionId: messageToSend.partitionId });
      batch.tryAdd({ body: messageToSend.body });
      await client.sendBatch(batch);
    }
    return lastExpectedMessageCount;
  }

  private get(partitionId: string): ReceivedMessages {
    should.equal(this.data.has(partitionId), true);
    const receivedData = this.data.get(partitionId)!;
    return receivedData;
  }

  private contextIsOk(context: PartitionContext | PartitionContext): void {
    should.exist(context.consumerGroup);
    should.exist(context.eventHubName);
    should.exist(context.fullyQualifiedNamespace);

    // if we start getting messages for other partitions
    // we should immediately error out)
    if (context.partitionId) {
      should.exist(this.expectedPartitions.includes(context.partitionId));
    }
  }
}
