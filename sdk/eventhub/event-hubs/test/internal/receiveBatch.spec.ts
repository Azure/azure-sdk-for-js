// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  MessagingError,
} from "../../src/index.js";
import { translate } from "@azure/core-amqp";
import type { ConnectionContext } from "../../src/connectionContext.js";
import { createReceiver as createPartitionReceiver } from "../../src/partitionReceiver.js";
import type { PartitionReceiver } from "../../src/partitionReceiver.js";
import type { PartitionReceiverOptions } from "../../src/models/private.js";
import "../utils/chai.js";
import type { CreateReceiverOptions, EventContext, Receiver } from "rhea-promise";
import { describe, it, beforeEach, afterEach, vi } from "vitest";
import { createConsumer, createProducer, createReceiver } from "../utils/clients.js";

describe("EventHubConsumerClient", () => {
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;
  let partitionIds: string[];

  beforeEach(async () => {
    producerClient = createProducer().producer;
    consumerClient = createConsumer().consumer;
    partitionIds = await producerClient.getPartitionIds({});
  });

  afterEach(async () => {
    await producerClient.close();
    await consumerClient.close();
  });

  describe("EventHubConsumer receiveBatch", () => {
    it("should not lose messages on error", async () => {
      const partitionId = partitionIds[0];
      const { lastEnqueuedSequenceNumber } =
        await producerClient.getPartitionProperties(partitionId);

      // Ensure the receiver only looks at new messages.
      const startPosition: EventPosition = {
        sequenceNumber: lastEnqueuedSequenceNumber,
        isInclusive: false,
      };

      // Send a message we expect to receive.
      const message: EventData = { body: "remember me!" };
      await producerClient.sendBatch([message], { partitionId });

      // Disable retries to make it easier to test scenario.
      const { receiver } = createReceiver({
        ctx: consumerClient["_context"],
        consumerId: "Consumer",
        partitionId,
        eventPosition: startPosition,
        options: {
          retryOptions: {
            maxRetries: 0,
          },
        },
      });

      // Periodically check that the receiver's checkpoint has been updated.
      const checkpointInterval = setInterval(() => {
        if (receiver.checkpoint > -1) {
          clearInterval(checkpointInterval);
          const error = translate(new Error("I break receivers for fun."));
          receiver["_onError"]!(error);
        }
      }, 10);

      try {
        // There is only 1 message.
        // We expect to see an error.
        await receiver.receiveBatch(2, 60);
        throw new Error(`Test failure`);
      } catch (err: any) {
        err.message.should.not.equal("Test failure");
        receiver.checkpoint.should.be.greaterThan(-1, "Did not see a message come through.");
      } finally {
        clearInterval(checkpointInterval);
      }

      const events = await receiver.receiveBatch(1);
      events.length.should.equal(1, "Unexpected number of events received.");
      events[0].body.should.equal(message.body, "Unexpected message received.");
    });

    it("should not lose messages between retries", async () => {
      const partitionId = partitionIds[0];
      const { lastEnqueuedSequenceNumber } =
        await producerClient.getPartitionProperties(partitionId);

      // Ensure the receiver only looks at new messages.
      const startPosition: EventPosition = {
        sequenceNumber: lastEnqueuedSequenceNumber,
        isInclusive: false,
      };

      // Send a message we expect to receive.
      const message: EventData = { body: "remember me!" };
      await producerClient.sendBatch([message], { partitionId });

      // Disable retries to make it easier to test scenario.
      const { receiver } = createReceiver({
        ctx: consumerClient["_context"],
        consumerId: "Consumer",
        partitionId,
        eventPosition: startPosition,
        options: {
          retryOptions: {
            maxRetries: 1,
          },
        },
      });

      // Periodically check that the receiver's checkpoint has been updated.
      const checkpointInterval = setInterval(() => {
        if (receiver.checkpoint > -1) {
          clearInterval(checkpointInterval);
          const error = translate(new Error("I break receivers for fun.")) as MessagingError;
          error.retryable = true;
          receiver["_onError"]!(error);
        }
      }, 10);

      // There is only 1 message.
      const events = await receiver.receiveBatch(2, 20);

      events.length.should.equal(1, "Unexpected number of events received.");
      events[0].body.should.equal(message.body, "Unexpected message received.");
    });
  });
});

function createFakeReceiver(options: PartitionReceiverOptions = {}): {
  context: ConnectionContext;
  receiver: PartitionReceiver;
  additions: number[];
  getCredit: () => number;
  getQueueLength: () => number;
  removeFromQueue: (count: number) => void;
  dispatch: (body: string) => void;
} {
  let credit = 0;
  let queueLength = 0;
  let linkIsOpen = true;
  let onMessage: ((context: EventContext) => void) | undefined;
  const additions: number[] = [];

  const link = {
    get credit() {
      return credit;
    },
    addCredit: vi.fn((credits: number) => {
      additions.push(credits);
      credit += credits;
    }),
    close: vi.fn(async () => {
      linkIsOpen = false;
    }),
    isOpen: () => linkIsOpen,
  } as unknown as Receiver;

  const createAmqpReceiver = vi.fn(async (receiverOptions: CreateReceiverOptions) => {
    onMessage = receiverOptions.onMessage;
    return link;
  });

  const context = {
    connectionId: "fake-connection",
    config: {
      host: "fake.servicebus.windows.net",
      endpoint: "sb://fake.servicebus.windows.net/",
      entityPath: "fake-event-hub",
      getReceiverAddress: () => "fake-event-hub/ConsumerGroups/$default/Partitions/0",
      getReceiverAudience: () =>
        "sb://fake.servicebus.windows.net/fake-event-hub/ConsumerGroups/$default/Partitions/0",
    },
    tokenCredential: {
      isSasTokenProvider: true as const,
      getToken: vi.fn(async () => ({ token: "fake-token" })),
    },
    cbsSession: {
      cbsLock: "fake-cbs-lock",
      init: vi.fn(async () => undefined),
      negotiateClaim: vi.fn(async () => ({ statusCode: 200 })),
    },
    connection: {
      createReceiver: createAmqpReceiver,
    },
    readyToOpenLink: vi.fn(async () => undefined),
    wasConnectionCloseCalled: false,
    receivers: {},
    senders: {},
    close: vi.fn(async () => undefined),
  } as unknown as ConnectionContext;

  const receiver = createPartitionReceiver(
    context,
    "$default",
    "fake-consumer",
    "0",
    { enqueuedOn: Date.now() },
    options,
  );

  return {
    context,
    receiver,
    additions,
    getCredit: () => credit,
    getQueueLength: () => queueLength,
    removeFromQueue: (count: number) => {
      queueLength -= count;
    },
    dispatch: (body: string) => {
      if (!onMessage) {
        throw new Error("The receiver has not been connected.");
      }
      credit -= 1;
      queueLength += 1;
      onMessage({ message: { body } } as EventContext);
    },
  };
}

describe("PartitionReceiver credit replenishment", () => {
  let fake: ReturnType<typeof createFakeReceiver>;

  afterEach(async () => {
    await fake.receiver.close();
    await fake.context.close();
    vi.restoreAllMocks();
  });

  it("does not increase receiver credit across repeated empty receive cycles", async () => {
    fake = createFakeReceiver();
    const results = [];

    for (let cycle = 0; cycle < 3; cycle++) {
      results.push(await fake.receiver.receiveBatch(2, 0));
    }

    results.forEach((events) => events.length.should.equal(0));
    ({ additions: fake.additions, credit: fake.getCredit() }).should.deep.equal({
      additions: [6],
      credit: 6,
    });
    (fake.getQueueLength() + fake.getCredit()).should.be.at.most(6);
  });

  it("accounts for queued events and existing credit when replenishing", async () => {
    fake = createFakeReceiver({ prefetchCount: 5 });

    const initialEvents = await fake.receiver.receiveBatch(2, 0);
    initialEvents.length.should.equal(0);
    fake.getQueueLength().should.equal(0);
    fake.getCredit().should.equal(5);

    fake.dispatch("event-1");
    fake.dispatch("event-2");
    fake.dispatch("event-3");
    (fake.getQueueLength() + fake.getCredit()).should.equal(5);

    const firstEvents = await fake.receiver.receiveBatch(2, 0);
    firstEvents.length.should.equal(2);
    fake.removeFromQueue(firstEvents.length);
    fake.getQueueLength().should.equal(1);
    (fake.getQueueLength() + fake.getCredit()).should.be.at.most(5);

    const secondEvents = await fake.receiver.receiveBatch(2, 0);
    secondEvents.length.should.equal(1);
    fake.removeFromQueue(secondEvents.length);
    fake.getQueueLength().should.equal(0);

    fake.additions.should.deep.equal([5, 2]);
    (fake.getQueueLength() + fake.getCredit()).should.be.at.most(5);
  });
});
