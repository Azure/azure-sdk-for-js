// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { v4 as uuid } from "uuid";
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
import { EventHubClient } from "../src/impl/eventHubClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
import { EventHubConsumer } from "../src/receiver";
import { ReceiveHandler } from "../src/receiveHandler";
const env = getEnvVars();

describe("EventHub Receiver", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client = new EventHubClient(service.connectionString, service.path);
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;

  let receiver: EventHubConsumer | undefined;
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

  after("close the connection", async function(): Promise<void> {
    await client.close();
    await producerClient.close();
  });

  beforeEach("Creating the clients", async () => {
    producerClient = new EventHubProducerClient(service.connectionString, service.path);
    consumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      service.connectionString,
      service.path
    );
    partitionIds = await consumerClient.getPartitionIds({});
  });

  afterEach("Closing the clients", async () => {
    await producerClient.close();
    await consumerClient.close();
    if (receiver && !receiver.isClosed) {
      await receiver.close();
      debug("After each - Receiver closed.");
    }
    receiver = undefined;
  });

  describe("with partitionId 0 as number", function(): void {
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

  describe("with EventPosition specified as", function(): void {
    it("'from end of stream' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      debug("Creating new receiver with offset EndOfStream");
      const receiver = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        latestEventPosition
      );
      const data = await receiver.receiveBatch(10, 10);
      data.length.should.equal(0, "Unexpected message received when using EventPosition.fromEnd()");
      const events: EventData[] = [];
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        };
        events.push(ed);
      }
      await producerClient.sendBatch(events, { partitionId: partitionId });
      debug(">>>>>>> Sent the new messages. We should only receive these messages.");
      const data2 = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data2);
      data2.length.should.equal(10, "Failed to receive the expected nummber of messages");
      debug("Next receive on this partition should not receive any messages.");
      const data3 = await receiver.receiveBatch(10, 10);
      data3.length.should.equal(0, "Unexpected message received");
      await receiver.close();
    });

    it("'from last enqueued sequence number' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
      debug("Creating a receiver with last enqueued sequence number");
      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        sequenceNumber: partitionInfo.lastEnqueuedSequenceNumber
      });
      const data = await receiver.receiveBatch(10, 10);
      data.length.should.equal(
        0,
        "Unexpected message received when using EventPosition with sequenceNumber"
      );
      const events: EventData[] = [];
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        };
        events.push(ed);
      }
      await producerClient.sendBatch(events, { partitionId: partitionId });
      debug(">>>>>>> Sent 10 messages. We should only receive these 10 messages.");
      const data2 = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data2);
      data2.length.should.equal(10, "Failed to receive the expected nummber of messages");
      await receiver.close();
    });

    it("'after a particular offset' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      debug(`Creating new receiver with last enqueued offset: "${pInfo.lastEnqueuedOffset}".`);
      debug("Establishing the receiver link...");
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued offset",
        properties: {
          stamp: uid
        }
      };
      await producerClient.sendBatch([ed], { partitionId: partitionId });
      debug(
        "Sent the new message after creating the receiver. We should only receive this message."
      );
      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        offset: pInfo.lastEnqueuedOffset
      });
      const data = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data);
      data.length.should.equal(1);
      data[0].properties!.stamp.should.equal(uid);
    });

    it("'from a particular enqueued time' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      debug(`Creating new receiver with last enqueued time: "${pInfo.lastEnqueuedOnUtc}".`);
      debug("Establishing the receiver link...");

      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued time " + pInfo.lastEnqueuedOnUtc,
        properties: {
          stamp: uid
        }
      };
      await producerClient.sendBatch([ed], { partitionId: partitionId });
      debug(
        "Sent the new message after creating the receiver. We should only receive this message."
      );

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: pInfo.lastEnqueuedOnUtc
      });
      const data = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data);
      data.length.should.equal(1, "Failed to received the expected single message");
      data[0].properties!.stamp.should.equal(uid);
    });

    it("'after the particular sequence number' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued sequence number " + pInfo.lastEnqueuedSequenceNumber,
        properties: {
          stamp: uid
        }
      };
      await producerClient.sendBatch([ed], { partitionId: partitionId });
      debug(
        "Sent the new message after getting the partition runtime information. We should only receive this message."
      );
      debug(
        `Creating new receiver with last enqueued sequence number: "${pInfo.lastEnqueuedSequenceNumber}".`
      );
      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        sequenceNumber: pInfo.lastEnqueuedSequenceNumber
      });
      const data = await receiver.receiveBatch(1, 20);
      debug("received messages: ", data);
      data.length.should.equal(1, "Failed to receive the expected single message");
      data[0].properties!.stamp.should.equal(uid, "Received message has unexpected uid");
      debug("Next receive on this partition should not receive any messages.");
      const data2 = await receiver.receiveBatch(1, 1);
      data2.length.should.equal(0, "Unexpected message received");
    });

    it("'after the particular sequence number' with isInclusive true should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const uid = uuid();
      const ed: EventData = {
        body: "New message before getting the last sequence number",
        properties: {
          stamp: uid
        }
      };
      await producerClient.sendBatch([ed], { partitionId: partitionId });
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after the last enqueued offset",
        properties: {
          stamp: uid2
        }
      };
      await producerClient.sendBatch([ed2], { partitionId: partitionId });
      debug(`Sent message 2 with stamp: ${uid}.`);
      debug(
        `Creating new receiver with last sequence number: "${pInfo.lastEnqueuedSequenceNumber}".`
      );
      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        sequenceNumber: pInfo.lastEnqueuedSequenceNumber,
        isInclusive: true
      });
      debug("We should receive the last 2 messages.");
      const data = await receiver.receiveBatch(2, 30);
      debug("received messages: ", data);
      data.length.should.equal(2, "Failed to received two expected messages");
      data[0].properties!.stamp.should.equal(uid, "Message 1 has unexpected uid");
      data[1].properties!.stamp.should.equal(uid2, "Message 2 has unexpected uid");
      debug("Next receive on this partition should not receive any messages.");
      const data2 = await receiver.receiveBatch(1, 1);
      data2.length.should.equal(0, "Unexpected message received");
    });
  });

  describe("in streaming mode", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      
      // send a message that can be received
      await producerClient.sendBatch([{ body: "receive behaves correctly" }], { partitionId });

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        sequenceNumber: pInfo.lastEnqueuedSequenceNumber
      });

      const received: ReceivedEventData[] = await new Promise((resolve, reject) => {
        let shouldStop = false;
        const events: ReceivedEventData[] = [];

        const handler = receiver!.receive((event) => {
          if (!shouldStop) {
            events.push(event);
            shouldStop = true;
            handler
              .stop()
              .then(() => resolve(events))
              .catch(reject);
          }
        }, reject);
      });

      received.length.should.equal(1);
    });

    it("should support being cancelled", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "receive cancellation - timeout 0" }], { partitionId });

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

      try {
        await new Promise((resolve, reject) => {
          let shouldStop = false;
          const events: ReceivedEventData[] = [];
          // abortSignal event listeners will be triggered after synchronous paths are executed
          const abortSignal = AbortController.timeout(0);

          const handler = receiver!.receive(
            (event) => {
              if (!shouldStop) {
                events.push(event);
                shouldStop = true;
                handler
                  .stop()
                  .then(() => resolve(events))
                  .catch(reject);
              }
            },
            reject,
            abortSignal
          );
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "receive cancellation - immediate" }], { partitionId });

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

      try {
        await new Promise((resolve, reject) => {
          let shouldStop = false;
          const events: ReceivedEventData[] = [];

          // create an AbortSignal that's in the aborted state
          const abortController = new AbortController();
          abortController.abort();

          const handler = receiver!.receive(
            (event) => {
              if (!shouldStop) {
                events.push(event);
                shouldStop = true;
                handler
                  .stop()
                  .then(() => resolve(events))
                  .catch(reject);
              }
            },
            reject,
            abortController.signal
          );
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }
    });

    it("should not support creating a new handler after cancellation", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "receive cancellation - immediate" }], { partitionId });

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

      try {
        await new Promise((resolve, reject) => {
          let shouldStop = false;
          const events: ReceivedEventData[] = [];

          // create an AbortSignal that's in the aborted state
          const abortController = new AbortController();
          abortController.abort();

          const handler = receiver!.receive(
            (event) => {
              if (!shouldStop) {
                events.push(event);
                shouldStop = true;
                handler
                  .stop()
                  .then(() => resolve(events))
                  .catch(reject);
              }
            },
            reject,
            abortController.signal
          );
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");

        const events: ReceivedEventData[] = [];
        try {
          await new Promise((resolve, reject) => {
            let shouldStop = false;

            const handler = receiver!.receive((event) => {
              if (!shouldStop) {
                events.push(event);
                shouldStop = true;
                handler
                  .stop()
                  .then(() => resolve(events))
                  .catch(reject);
              }
            }, reject);
          });
        } catch (err) {
          err.message.should.match(
            /The EventHubConsumer for ".+" has been closed and can no longer be used.*/gi
          );
        }

        events.length.should.equal(0);
      }
    });
  });

  describe("in batch mode", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      receiver = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        earliestEventPosition
      );
      const data = await receiver.receiveBatch(5, 10);
      debug("received messages: ", data);
      data.length.should.equal(5, "Failed to receive five expected messages");
    });

    it("should receive messages correctly with maxRetries 0", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      receiver = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        earliestEventPosition,
        { retryOptions: { maxRetries: 0 } }
      );
      const data = await receiver.receiveBatch(5, 10);
      debug("received messages: ", data);
      data.length.should.equal(5, "Failed to receive five expected messages");
    });

    it("should support being cancelled", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - timeout 0" }], { partitionId });

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - immediate" }], { partitionId });
      
      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

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
    });

    it("should support cancellation when a connection already exists", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - timeout 0" }], { partitionId });

      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

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
    });

    it("should not support calling receiveBatch after a cancellation", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver post-cancellation - timeout 0" }], { partitionId });
      
      receiver = client.createConsumer(EventHubConsumerClient.defaultConsumerGroupName, partitionId, {
        enqueuedOn: time
      });

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
        try {
          await receiver.receiveBatch(1, 60);
          throw new Error(`Test failure`);
        } catch (err) {
          err.message.should.match(
            /The EventHubConsumer for ".+" has been closed and can no longer be used.*/gi
          );
        }
      }
    });
  });

  describe("with trackLastEnqueuedEventProperties", function(): void {
    it("should have lastEnqueuedEventProperties populated", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        };
        await producerClient.sendBatch([ed], { partitionId });
        debug("sent message - " + i);
      }
      debug("Getting the partition information");
      const pInfo = await consumerClient.getPartitionProperties(partitionId);
      debug("partition info: ", pInfo);
      debug("Creating new receiver with offset EndOfStream");
      receiver = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        earliestEventPosition,
        {
          trackLastEnqueuedEventProperties: true
        }
      );

      const data = await receiver.receiveBatch(1, 10);
      debug("receiver.runtimeInfo ", receiver.lastEnqueuedEventProperties);
      data.length.should.equal(1);
      should.exist(receiver.lastEnqueuedEventProperties);
      receiver.lastEnqueuedEventProperties!.offset!.should.equal(pInfo.lastEnqueuedOffset);
      receiver.lastEnqueuedEventProperties!.sequenceNumber!.should.equal(
        pInfo.lastEnqueuedSequenceNumber
      );
      receiver
        .lastEnqueuedEventProperties!.enqueuedOn!.getTime()
        .should.equal(pInfo.lastEnqueuedOnUtc.getTime());
      receiver
        .lastEnqueuedEventProperties!.retrievedOn!.getTime()
        .should.be.greaterThan(Date.now() - 60000);
    });
  });

  describe("with ownerLevel", function(): void {
    it("should behave correctly when a receiver with lower ownerLevel value is connected after a receiver with higher ownerLevel value to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let ownerLevelRcvr1: ReceiveHandler;
      let ownerLevelRcvr2: ReceiveHandler;
      const onError = (error: MessagingError | Error) => {
        debug(">>>> ownerLevel Receiver 1", error);
        throw new Error(
          "An Error should not have happened for ownerLevel receiver with ownerLevel value 2."
        );
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> ownerLevel Receiver 1", data);
      };
      const receiver1 = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        latestEventPosition,
        {
          ownerLevel: 2
        }
      );
      ownerLevelRcvr1 = receiver1.receive(onMsg, onError);
      debug("Created ownerLevel receiver 1 %s", ownerLevelRcvr1);
      setTimeout(() => {
        const onError2 = (error: MessagingError | Error) => {
          debug(">>>> ownerLevel Receiver 2", error);
          should.exist(error);
          should.equal((error as any).code, "ReceiverDisconnectedError");
          ownerLevelRcvr2
            .stop()
            .then(() => receiver2.close())
            .then(() => ownerLevelRcvr1.stop())
            .then(() => receiver1.close())
            .then(() => {
              debug("Successfully closed the ownerLevel receivers 1 and 2.");
              done();
            })
            .catch((err) => {
              debug("error occurred while closing the receivers... ", err);
              done();
            });
        };
        const onMsg2 = (data: ReceivedEventData) => {
          debug(">>>> ownerLevel Receiver 2", data);
        };
        const receiver2 = client.createConsumer(
          EventHubConsumerClient.defaultConsumerGroupName,
          partitionId,
          latestEventPosition,
          {
            ownerLevel: 1
          }
        );
        ownerLevelRcvr2 = receiver2.receive(onMsg2, onError2);
        debug("Created ownerLevel receiver 2 %s", ownerLevelRcvr2);
      }, 3000);
    });

    it("should behave correctly when a receiver with higher ownerLevel value is connected after a receiver with lower ownerLevel value to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let ownerLevelRcvr1: ReceiveHandler;
      let ownerLevelRcvr2: ReceiveHandler;
      let receiver2: EventHubConsumer;
      const onError = (error: MessagingError | Error) => {
        debug(">>>> ownerLevel Receiver 1", error);
        should.exist(error);
        should.equal((error as any).code, "ReceiverDisconnectedError");
        ownerLevelRcvr1
          .stop()
          .then(() => receiver1.close())
          .then(() => ownerLevelRcvr2.stop())
          .then(() => receiver2.close())
          .then(() => {
            debug("Successfully closed the ownerLevel receivers 1 and 2.");
            done();
          })
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> ownerLevel Receiver 1", data);
      };
      const receiver1 = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        latestEventPosition,
        {
          ownerLevel: 1
        }
      );
      ownerLevelRcvr1 = receiver1.receive(onMsg, onError);
      debug("Created ownerLevel receiver 1 %s", ownerLevelRcvr1);
      setTimeout(() => {
        const onError2 = (error: MessagingError | Error) => {
          debug(">>>> ownerLevel Receiver 2", error);
          throw new Error(
            "An Error should not have happened for ownerLevel receiver with ownerLevel value 2."
          );
        };
        const onMsg2 = (data: ReceivedEventData) => {
          debug(">>>> ownerLevel Receiver 2", data);
        };
        receiver2 = client.createConsumer(
          EventHubConsumerClient.defaultConsumerGroupName,
          partitionId,
          latestEventPosition,
          {
            ownerLevel: 2
          }
        );
        ownerLevelRcvr2 = receiver2.receive(onMsg2, onError2);
        debug("Created ownerLevel receiver 2 %s", ownerLevelRcvr2);
      }, 3000);
    });

    it("should behave correctly when a non ownerLevel receiver is created after an ownerLevel receiver", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let ownerLevelRcvr: ReceiveHandler;
      let nonownerLevelRcvr: ReceiveHandler;
      const onerr1 = (error: MessagingError | Error) => {
        debug(">>>> ownerLevel Receiver ", error);
        throw new Error(
          "An Error should not have happened for ownerLevel receiver with ownerLevel value 1."
        );
      };
      const onmsg1 = (data: ReceivedEventData) => {
        debug(">>>> ownerLevel Receiver ", data);
      };
      const receiver1 = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        latestEventPosition,
        {
          ownerLevel: 1
        }
      );
      ownerLevelRcvr = receiver1.receive(onmsg1, onerr1);
      debug("Created ownerLevel receiver %s", ownerLevelRcvr);
      const onerr2 = (error: MessagingError | Error) => {
        debug(">>>> non ownerLevel Receiver", error);
        should.exist(error);
        should.equal((error as any).code, "ReceiverDisconnectedError");
        nonownerLevelRcvr
          .stop()
          .then(() => receiver2.close())
          .then(() => ownerLevelRcvr.stop())
          .then(() => receiver1.close())
          .then(() => {
            debug("Successfully closed the nonownerLevel and ownerLevel receivers");
            done();
          })
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg2 = (data: ReceivedEventData) => {
        debug(">>>> non ownerLevel Receiver", data);
      };
      const receiver2 = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        latestEventPosition
      );
      nonownerLevelRcvr = receiver2.receive(onmsg2, onerr2);
      debug("Created non ownerLevel receiver %s", nonownerLevelRcvr);
    });

    it("should behave correctly when an ownerLevel receiver is created after a non ownerLevel receiver", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let ownerLevelRcvr: ReceiveHandler;
      let nonownerLevelRcvr: ReceiveHandler;
      let receiver1: EventHubConsumer;
      let receiver2: EventHubConsumer;
      const onerr3 = (error: MessagingError | Error) => {
        debug(">>>> non ownerLevel Receiver", error);
        should.exist(error);
        should.equal((error as any).code, "ReceiverDisconnectedError");
        nonownerLevelRcvr
          .stop()
          .then(() => receiver1.close())
          .then(() => ownerLevelRcvr.stop())
          .then(() => receiver2.close())
          .then(() => {
            debug("Successfully closed the nonownerLevel and ownerLevel receivers");
            done();
          })
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg3 = (data: ReceivedEventData) => {
        debug(">>>> non ownerLevel Receiver", data);
      };
      receiver1 = client.createConsumer(
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        latestEventPosition
      );
      nonownerLevelRcvr = receiver1.receive(onmsg3, onerr3);
      debug("Created non ownerLevel receiver %s", nonownerLevelRcvr);
      setTimeout(() => {
        const onerr4 = (error: MessagingError | Error) => {
          debug(">>>> ownerLevel Receiver ", error);
          throw new Error(
            "OnErr4 >> An Error should not have happened for ownerLevel receiver with ownerLevel value 1."
          );
        };
        const onmsg4 = (data: ReceivedEventData) => {
          debug(">>>> ownerLevel Receiver ", data);
        };
        receiver2 = client.createConsumer(
          EventHubConsumerClient.defaultConsumerGroupName,
          partitionId,
          latestEventPosition,
          {
            ownerLevel: 1
          }
        );
        ownerLevelRcvr = receiver2.receive(onmsg4, onerr4);
        debug("Created ownerLevel receiver %s", ownerLevelRcvr);
      }, 3000);
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
