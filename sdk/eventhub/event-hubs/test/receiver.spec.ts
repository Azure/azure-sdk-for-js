// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:receiver-spec");
import {
  EventData,
  MessagingError,
  ReceivedEventData,
  latestEventPosition,
  earliestEventPosition,
  EventHubConsumerClient,
  EventHubProducerClient,
  Subscription
} from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
import { EventHubReceiver } from "../src/eventHubReceiver";
const env = getEnvVars();

describe("EventHubConsumerClient", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;
  let partitionIds: string[];
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  beforeEach("Creating the clients", async () => {
    producerClient = new EventHubProducerClient(service.connectionString, service.path);
    consumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      service.connectionString,
      service.path
    );
    partitionIds = await producerClient.getPartitionIds({});
  });

  afterEach("Closing the clients", async () => {
    await producerClient.close();
    await consumerClient.close();
  });

  describe("subscribe() with partitionId 0 as number", function(): void {
    it("should not throw an error", async function(): Promise<void> {
      let subscription: Subscription | undefined;
      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          // @ts-expect-error
          0,
          {
            processEvents: async () => {
              resolve();
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: latestEventPosition,
            maxWaitTimeInSeconds: 0 // Set timeout of 0 to resolve the promise ASAP
          }
        );
      });
      await subscription!.close();
    });
  });

  describe("subscribe() with EventPosition specified as", function(): void {
    let partitionId: string;
    let eventSentBeforeSubscribe: EventData;
    let eventsSentAfterSubscribe: EventData[];

    beforeEach(async () => {
      partitionId = partitionIds[0];

      eventSentBeforeSubscribe = {
        body: "Hello awesome world " + Math.random()
      };
      await producerClient.sendBatch([eventSentBeforeSubscribe], { partitionId });

      eventsSentAfterSubscribe = [];
      for (let i = 0; i < 5; i++) {
        eventsSentAfterSubscribe.push({
          body: "Hello awesome world " + Math.random(),
          properties: {
            stamp: Math.random()
          }
        });
      }
    });

    it("'from end of stream' should receive messages correctly", async function(): Promise<void> {
      let subscription: Subscription | undefined;
      let processEventsCalled = false;
      const eventsReceived: ReceivedEventData[] = [];

      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              if (!processEventsCalled) {
                processEventsCalled = true;
                should.equal(data.length, 0, "Received events when none were sent yet.");
                await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                return;
              }
              eventsReceived.push(...data);
              if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: latestEventPosition,
            maxWaitTimeInSeconds: 30
          }
        );
      });
      await subscription!.close();

      if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
        should.fail("Received event sent before subscribe call with latestEventPosition.");
      }

      should.equal(
        eventsReceived.length,
        eventsSentAfterSubscribe.length,
        "Not received the same number of events that were sent."
      );
      for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
        eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
        eventsReceived[i].properties!.stamp.should.equal(
          eventsSentAfterSubscribe[i].properties!.stamp
        );
      }
    });

    it("'after a particular sequence number' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
      let subscription: Subscription | undefined;
      let processEventsCalled = false;
      const eventsReceived: ReceivedEventData[] = [];

      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              if (!processEventsCalled) {
                processEventsCalled = true;
                should.equal(data.length, 0, "Received events when none were sent yet.");
                await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                return;
              }
              eventsReceived.push(...data);
              if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: { sequenceNumber: partitionInfo.lastEnqueuedSequenceNumber },
            maxWaitTimeInSeconds: 30
          }
        );
      });
      await subscription!.close();

      if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
        should.fail("Received event sent before subscribe call with last sequence number.");
      }

      should.equal(
        eventsReceived.length,
        eventsSentAfterSubscribe.length,
        "Not received the same number of events that were sent."
      );
      for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
        eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
        eventsReceived[i].properties!.stamp.should.equal(
          eventsSentAfterSubscribe[i].properties!.stamp
        );
      }
    });

    it("'after a particular sequence number' with isInclusive should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
      let subscription: Subscription | undefined;
      let processEventsCalled = false;
      const eventsReceived: ReceivedEventData[] = [];

      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              if (!processEventsCalled) {
                processEventsCalled = true;
                should.equal(data.length, 1, "Expected 1 event sent right before subscribe call.");
                should.equal(
                  data[0].body,
                  eventSentBeforeSubscribe.body,
                  "Should have received only the 1 event sent right before subscribe call."
                );

                await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                return;
              }

              eventsReceived.push(...data);
              if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: {
              sequenceNumber: partitionInfo.lastEnqueuedSequenceNumber,
              isInclusive: true
            },
            maxWaitTimeInSeconds: 30
          }
        );
      });
      await subscription!.close();

      should.equal(
        eventsReceived.length,
        eventsSentAfterSubscribe.length,
        "Not received the same number of events that were sent."
      );

      for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
        eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
        eventsReceived[i].properties!.stamp.should.equal(
          eventsSentAfterSubscribe[i].properties!.stamp
        );
      }
    });

    it("'after a particular offset' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
      let subscription: Subscription | undefined;
      let processEventsCalled = false;
      const eventsReceived: ReceivedEventData[] = [];

      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              if (!processEventsCalled) {
                processEventsCalled = true;
                should.equal(data.length, 0, "Received events when none were sent yet.");
                await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                return;
              }
              eventsReceived.push(...data);
              if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: { offset: partitionInfo.lastEnqueuedOffset },
            maxWaitTimeInSeconds: 30
          }
        );
      });
      await subscription!.close();

      if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
        should.fail("Received event sent before subscribe call with last offset.");
      }

      should.equal(
        eventsReceived.length,
        eventsSentAfterSubscribe.length,
        "Not received the same number of events that were sent."
      );
      for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
        eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
        eventsReceived[i].properties!.stamp.should.equal(
          eventsSentAfterSubscribe[i].properties!.stamp
        );
      }
    });

    it("'after a particular offset' with isInclusive should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
      let subscription: Subscription | undefined;
      let processEventsCalled = false;
      const eventsReceived: ReceivedEventData[] = [];

      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              if (!processEventsCalled) {
                processEventsCalled = true;
                should.equal(data.length, 1, "Expected 1 event sent right before subscribe call.");
                should.equal(
                  data[0].body,
                  eventSentBeforeSubscribe.body,
                  "Should have received only the 1 event sent right before subscribe call."
                );

                await producerClient.sendBatch(eventsSentAfterSubscribe, {
                  partitionId
                });
                return;
              }

              eventsReceived.push(...data);
              if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: {
              offset: partitionInfo.lastEnqueuedOffset,
              isInclusive: true
            },
            maxWaitTimeInSeconds: 30
          }
        );
      });
      await subscription!.close();

      should.equal(
        eventsReceived.length,
        eventsSentAfterSubscribe.length,
        "Not received the same number of events that were sent."
      );

      for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
        eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
        eventsReceived[i].properties!.stamp.should.equal(
          eventsSentAfterSubscribe[i].properties!.stamp
        );
      }
    });

    it("'after a particular enqueued time' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
      let subscription: Subscription | undefined;
      let processEventsCalled = false;
      const eventsReceived: ReceivedEventData[] = [];

      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              if (!processEventsCalled) {
                processEventsCalled = true;
                should.equal(data.length, 0, "Received events when none were sent yet.");
                await producerClient.sendBatch(eventsSentAfterSubscribe, {
                  partitionId
                });
                return;
              }

              eventsReceived.push(...data);
              if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: { enqueuedOn: partitionInfo.lastEnqueuedOnUtc },
            maxWaitTimeInSeconds: 30
          }
        );
      });
      await subscription!.close();

      if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
        should.fail("Received event sent before subscribe call with last offset.");
      }

      should.equal(
        eventsReceived.length,
        eventsSentAfterSubscribe.length,
        "Not received the same number of events that were sent."
      );
      for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
        eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
        eventsReceived[i].properties!.stamp.should.equal(
          eventsSentAfterSubscribe[i].properties!.stamp
        );
      }
    });
  });

  describe("EventHubConsumer receiveBatch", function(): void {
    it("should support being cancelled", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - timeout 0" }], {
        partitionId
      });

      const receiver = new EventHubReceiver(
        consumerClient["_context"],
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        {
          enqueuedOn: time
        }
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }

      await receiver.close();
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - immediate" }], {
        partitionId
      });

      const receiver = new EventHubReceiver(
        consumerClient["_context"],
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        {
          enqueuedOn: time
        }
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortController = new AbortController();
        abortController.abort();
        await receiver.receiveBatch(1, 60, abortController.signal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }

      await receiver.close();
    });

    it("should support cancellation when a connection already exists", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - timeout 0" }], {
        partitionId
      });

      const receiver = new EventHubReceiver(
        consumerClient["_context"],
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        {
          enqueuedOn: time
        }
      );

      try {
        // call receiveBatch once to establish a connection
        await receiver.receiveBatch(1, 60);
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }

      await receiver.close();
    });
  });

  describe("subscribe() with trackLastEnqueuedEventProperties", function(): void {
    it("should have lastEnqueuedEventProperties populated", async function(): Promise<void> {
      const partitionId = partitionIds[0];

      const eventData = { body: "Hello awesome world " + Math.random() };
      await producerClient.sendBatch([eventData], { partitionId });
      debug("sent: ", eventData);

      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      debug("partition info: ", pInfo);

      let subscription: Subscription | undefined;
      await new Promise((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data, context) => {
              data.length.should.equal(1);
              should.exist(context.lastEnqueuedEventProperties);
              context.lastEnqueuedEventProperties!.offset!.should.equal(pInfo.lastEnqueuedOffset);
              context.lastEnqueuedEventProperties!.sequenceNumber!.should.equal(
                pInfo.lastEnqueuedSequenceNumber
              );
              context
                .lastEnqueuedEventProperties!.enqueuedOn!.getTime()
                .should.equal(pInfo.lastEnqueuedOnUtc.getTime());
              context
                .lastEnqueuedEventProperties!.retrievedOn!.getTime()
                .should.be.greaterThan(Date.now() - 60000);

              resolve();
            },
            processError: async (err) => {
              reject(err);
            }
          },
          {
            startPosition: earliestEventPosition,
            maxBatchSize: 1,
            trackLastEnqueuedEventProperties: true
          }
        );
      });
      await subscription!.close();
    });
  });

  describe("Negative scenarios", function(): void {
    it("should throw MessagingEntityNotFoundError for non existing consumer group", async function(): Promise<
      void
    > {
      const badConsumerClient = new EventHubConsumerClient(
        "boo",
        service.connectionString,
        service.path
      );
      let subscription: Subscription | undefined;
      const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
        subscription = badConsumerClient.subscribe(
          {
            processEvents: async () => {},
            processError: async (err) => {
              resolve(err);
            }
          },
          { maxWaitTimeInSeconds: 0 } // TODO: Remove after https://github.com/Azure/azure-sdk-for-js/pull/9543 is merged
        );
      });
      await subscription!.close();
      await badConsumerClient.close();

      should.exist(caughtErr);
      should.equal((caughtErr as MessagingError).code, "MessagingEntityNotFoundError");
    });

    it(`should throw an invalid EventHub address error for invalid partition`, async function(): Promise<
      void
    > {
      let subscription: Subscription | undefined;
      const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
        subscription = consumerClient.subscribe("boo", {
          processEvents: async () => {},
          processError: async (err) => {
            resolve(err);
          }
        });
      });
      await subscription!.close();
      should.exist(caughtErr);
      should.equal((caughtErr as MessagingError).code, "ArgumentOutOfRangeError");
    });
  });
}).timeout(90000);
