import { CloseReason, ReceivedEventData, delay } from "../../src/";
import { OptionalEventHandlers } from "../../src/eventHubConsumerClientModels";
import { PartitionContext } from "../../src/eventProcessor";
import chai from "chai";

const should = chai.should();

interface ReceivedMessages {
  closeReason?: CloseReason;
  errors: Error[];
}

/**
 * A simple tester that lets you easily poll for messages and check that they've
 * all been received at least once.
 */
export class ReceivedMessagesTester implements Required<OptionalEventHandlers> {
  public Data: Map<string, ReceivedMessages>;
  private expectedMessageBodies: Set<string>;

  public done: boolean;

  /**
   * Creates a ReceivedMessagesTester
   *
   * @param expectedPartitions The only partitions we expect to see messages from.
   * @param expectedMessageBodies The message bodies we expect to get at least once.
   * @param multipleConsumers If you're running a test that involves multiple consumers there
   *                      will be errors as they balance. Set this to true to be less picky
   *                      about errors that occur and concentrate on making sure all expected
   *                      messages are received at least once.
   */
  constructor(
    private expectedPartitions: string[],
    expectedMessageBodies: string[],
    private multipleConsumers: boolean
  ) {
    this.Data = new Map<string, ReceivedMessages>();
    this.expectedMessageBodies = new Set(expectedMessageBodies);
    this.done = false;
  }

  async onReceivedEvents(
    receivedEvents: ReceivedEventData[],
    context: PartitionContext
  ): Promise<void> {
    this.contextIsOk(context);

    for (const event of receivedEvents) {
      this.expectedMessageBodies.delete(event.body);
    }

    if (this.expectedMessageBodies.size === 0) {
      this.done = true;
    }
  }

  async onError(error: Error, context: PartitionContext): Promise<void> {
    this.contextIsOk(context);

    // this can happen when multiple consumers are spinning up and load balancing. We'll ignore it for multi-consumers
    // only.
    if (
      this.multipleConsumers &&
      error.message.indexOf("New receiver with higher epoch of") >= 0
    ) {
      return;
    }

    const receivedData = this.get(context.partitionId);
    receivedData.errors.push(error);
  }

  async onInitialize(context: PartitionContext): Promise<void> {
    this.contextIsOk(context);

    if (!this.multipleConsumers) {
      // this'll happen because for our multi-consumer tests we share the same
      // tester (to make sure that all messages have been received)
      //
      // So it's okay that initialize is called more than once per partition
      // in that case since the consumers, for a short time, can overlap as 
      // load balancing occurs.
      this.Data.has(context.partitionId).should.not.be.ok;
    }

    this.Data.set(context.partitionId, {
      closeReason: undefined,
      errors: []
    });
  }

  async onClose(reason: CloseReason, context: PartitionContext): Promise<void> {
    this.contextIsOk(context);

    const receivedData = this.get(context.partitionId);
    receivedData.closeReason = reason;
  }

  /**
   * Polls until all messages have been received (or until first error)
   */
  async poll(): Promise<void> {
    let lastExpectedMessageCount = this.expectedMessageBodies.size;
    const totalExpected = this.expectedMessageBodies.size;

    while (!this.done) {
      for (const data of this.Data) {
        if (data[1].errors.length > 0) {
          throw data[1].errors[0];
        }
      }

      if (lastExpectedMessageCount !== this.expectedMessageBodies.size) {
        console.log(
          `Receieved [${totalExpected -
            this.expectedMessageBodies.size}/${totalExpected}]. Still waiting for these messages:`
        );

        for (const body of this.expectedMessageBodies) {
          console.log(`   ${body}`);
        }

        lastExpectedMessageCount = this.expectedMessageBodies.size;
      }

      await delay(1000);
    }

    if (this.expectedMessageBodies.size > 0) {
      throw new Error(`Never got these messages: ${this.expectedMessageBodies}`);
    }

    console.log("All messages received");
  }

  private get(partitionId: string): ReceivedMessages {
    this.Data.has(partitionId).should.be.ok;
    const receivedData = this.Data.get(partitionId)!;
    return receivedData;
  }

  private contextIsOk(context: PartitionContext): void {
    context.partitionId.should.be.ok;
    context.consumerGroupName.should.be.ok;
    context.eventHubName.should.be.ok;

    // if we start getting messages for other partitions
    // we should immediately error out)
    should.exist(this.expectedPartitions.includes(context.partitionId));
  }
}
