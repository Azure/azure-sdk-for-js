// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import uuid from "uuid/v4";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:receiver-spec");
import {
  EventPosition,
  EventHubClient,
  EventData,
  MessagingError,
  ReceivedEventData,
  EventHubConsumer,
  delay
} from "../src";
import { BatchingReceiver } from "../src/batchingReceiver";
import { ReceiveHandler } from "../src/streamingReceiver";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
const env = getEnvVars();

describe("EventHub Receiver #RunnableInBrowser", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
  let breceiver: BatchingReceiver;
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
    partitionIds = await client.getPartitionIds();
  });

  after("close the connection", async function(): Promise<void> {
    await client.close();
  });

  afterEach("close the sender link", async function(): Promise<void> {
    if (breceiver) {
      await breceiver.close();
      debug("After each - Batching Receiver closed.");
    }
  });

  afterEach("close the receiver link", async function(): Promise<void> {
    if (receiver) {
      await receiver.close();
      debug("After each - Receiver closed.");
    }
  });

  describe("with partitionId 0 as number", function(): void {
    it("should not throw an error", async function(): Promise<void> {
      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        0 as any,
        EventPosition.fromSequenceNumber(0)
      );
      await receiver.receiveBatch(10, 20);
    });
  });

  describe("with EventPosition specified as", function(): void {
    // TODO: Below test is commented due to https://github.com/Azure/azure-sdk-for-js/issues/3938
    // it("'from end of stream' should receive messages correctly", async function(): Promise<void> {
    //   const partitionId = partitionIds[0];
    //   debug("Creating new receiver with offset EndOfStream");
    //   const receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, EventPosition.latest());
    //   const data = await receiver.receiveBatch(10, 10);
    //   data.length.should.equal(0, "Unexpected message received when using EventPosition.fromEnd()");
    //   const events: EventData[] = [];
    //   for (let i = 0; i < 10; i++) {
    //     const ed: EventData = {
    //       body: "Hello awesome world " + i
    //     };
    //     events.push(ed);
    //   }
    //   await client.createProducer({ partitionId: partitionId }).send(events);
    //   debug(">>>>>>> Sent the new messages. We should only receive these messages.");
    //   const data2 = await receiver.receiveBatch(10, 20);
    //   debug("received messages: ", data2);
    //   data2.length.should.equal(10, "Failed to receive the expected nummber of messages");
    //   debug("Next receive on this partition should not receive any messages.");
    //   const data3 = await receiver.receiveBatch(10, 10);
    //   data3.length.should.equal(0, "Unexpected message received");
    //   await receiver.close();
    // });

    it("'from last enqueued sequence number' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const partitionInfo = await client.getPartitionProperties(partitionId);
      debug("Creating a receiver with last enqueued sequence number");
      const receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromSequenceNumber(partitionInfo.lastEnqueuedSequenceNumber)
      );
      const data = await receiver.receiveBatch(10, 10);
      data.length.should.equal(0, "Unexpected message received when using EventPosition.fromSequenceNumber()");
      const events: EventData[] = [];
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        };
        events.push(ed);
      }
      await client.createProducer({ partitionId: partitionId }).send(events);
      debug(">>>>>>> Sent 10 messages. We should only receive these 10 messages.");
      const data2 = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data2);
      data2.length.should.equal(10, "Failed to receive the expected nummber of messages");
      await receiver.close();
    });

    it("'after a particular offset' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const pInfo = await client.getPartitionProperties(partitionId);
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
      await client.createProducer({ partitionId: partitionId }).send([ed]);
      debug("Sent the new message after creating the receiver. We should only receive this message.");
      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromOffset(pInfo.lastEnqueuedOffset)
      );
      const data = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data);
      data.length.should.equal(1);
      data[0].properties!.stamp.should.equal(uid);
    });

    it("'after a particular offset with isInclusive true' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued offset",
        properties: {
          stamp: uid
        }
      };
      await client.createProducer({ partitionId: partitionId }).send([ed]);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionProperties(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after last enqueued offset",
        properties: {
          stamp: uid2
        }
      };
      await client.createProducer({ partitionId: partitionId }).send([ed2]);
      debug(`Sent message 2 with stamp: ${uid} after getting the enqueued offset.`);
      debug(`Creating new receiver with last enqueued offset: "${pInfo.lastEnqueuedOffset}".`);
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromOffset(pInfo.lastEnqueuedOffset, true)
      );
      debug("We should receive the last 2 messages.");
      const data = await breceiver.receive(10, 30);
      debug("received messages: ", data);
      data.length.should.equal(2, "Failed to receive the two expected messages");
      data[0].properties!.stamp.should.equal(uid, "First message has unexpected uid");
      data[1].properties!.stamp.should.equal(uid2, "Second message has unexpected uid");
      debug("Next receive on this partition should not receive any messages.");
      const data2 = await breceiver.receive(10, 10);
      data2.length.should.equal(0, "Unexpected message received");
    });

    it("'from a particular enqueued time' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const pInfo = await client.getPartitionProperties(partitionId);
      debug(`Creating new receiver with last enqueued time: "${pInfo.lastEnqueuedTimeUtc}".`);
      debug("Establishing the receiver link...");

      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued time " + pInfo.lastEnqueuedTimeUtc,
        properties: {
          stamp: uid
        }
      };
      await client.createProducer({ partitionId: partitionId }).send([ed]);
      debug("Sent the new message after creating the receiver. We should only receive this message.");

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(pInfo.lastEnqueuedTimeUtc)
      );
      const data = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data);
      data.length.should.equal(1, "Failed to received the expected single message");
      data[0].properties!.stamp.should.equal(uid);
    });

    it("'after the particular sequence number' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const pInfo = await client.getPartitionProperties(partitionId);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued sequence number " + pInfo.lastEnqueuedSequenceNumber,
        properties: {
          stamp: uid
        }
      };
      await client.createProducer({ partitionId: partitionId }).send([ed]);
      debug(
        "Sent the new message after getting the partition runtime information. We should only receive this message."
      );
      debug(`Creating new receiver with last enqueued sequence number: "${pInfo.lastEnqueuedSequenceNumber}".`);
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromSequenceNumber(pInfo.lastEnqueuedSequenceNumber)
      );
      const data = await breceiver.receive(10, 20);
      debug("received messages: ", data);
      data.length.should.equal(1, "Failed to receive the expected single message");
      data[0].properties!.stamp.should.equal(uid, "Received message has unexpected uid");
      debug("Next receive on this partition should not receive any messages.");
      const data2 = await breceiver.receive(10, 10);
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
      await client.createProducer({ partitionId: partitionId }).send([ed]);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionProperties(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after the last enqueued offset",
        properties: {
          stamp: uid2
        }
      };
      await client.createProducer({ partitionId: partitionId }).send([ed2]);
      debug(`Sent message 2 with stamp: ${uid}.`);
      debug(`Creating new receiver with last sequence number: "${pInfo.lastEnqueuedSequenceNumber}".`);
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromSequenceNumber(pInfo.lastEnqueuedSequenceNumber, true)
      );
      debug("We should receive the last 2 messages.");
      const data = await breceiver.receive(10, 30);
      debug("received messages: ", data);
      data.length.should.equal(2, "Failed to received two expected messages");
      data[0].properties!.stamp.should.equal(uid, "Message 1 has unexpected uid");
      data[1].properties!.stamp.should.equal(uid2, "Message 2 has unexpected uid");
      debug("Next receive on this partition should not receive any messages.");
      const data2 = await breceiver.receive(10, 10);
      data2.length.should.equal(0, "Unexpected message received");
    });
  });

  describe("in streaming mode", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "receive behaves correctly" });
      } finally {
        await sender.close();
      }
      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      const received: ReceivedEventData[] = await new Promise((resolve, reject) => {
        let shouldStop = false;
        const events: ReceivedEventData[] = [];

        const handler = receiver!.receive(event => {
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
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "receive cancellation - timeout 0" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      try {
        await new Promise((resolve, reject) => {
          let shouldStop = false;
          const events: ReceivedEventData[] = [];
          // abortSignal event listeners will be triggered after synchronous paths are executed
          const abortSignal = AbortController.timeout(0);

          const handler = receiver!.receive(
            event => {
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

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "receive cancellation - immediate" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      try {
        await new Promise((resolve, reject) => {
          let shouldStop = false;
          const events: ReceivedEventData[] = [];

          // create an AbortSignal that's in the aborted state
          const abortController = new AbortController();
          abortController.abort();

          const handler = receiver!.receive(
            event => {
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

    it("should support creating a new handler after cancellation", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "receive cancellation - immediate" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      try {
        await new Promise((resolve, reject) => {
          let shouldStop = false;
          const events: ReceivedEventData[] = [];

          // create an AbortSignal that's in the aborted state
          const abortController = new AbortController();
          abortController.abort();

          const handler = receiver!.receive(
            event => {
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
        await new Promise((resolve, reject) => {
          let shouldStop = false;

          const handler = receiver!.receive(event => {
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

        events.length.should.equal(1);
      }
    });
  });

  describe("in batch mode #RunnableInBrowser", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, EventPosition.earliest());
      const data = await receiver.receiveBatch(5, 10);
      debug("received messages: ", data);
      data.length.should.equal(5, "Failed to receive five expected messages");
    });

    it("should support being cancelled", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "batchReceiver cancellation - timeout 0" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
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
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "batchReceiver cancellation - immediate" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
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
    });

    it("should support cancellation when a connection already exists", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "batchReceiver cancellation - timeout 0" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
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
    });

    it("should support calling receiveBatch after a cancellation", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "batchReceiver post-cancellation - timeout 0" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
        const events = await receiver.receiveBatch(1, 60);
        events.length.should.equal(1);
      }
    });
  });

  describe("getIterator", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];

      const time = Date.now();
      // ensure messages exist to retrieve
      const messageCount = 5;
      const sentEventData: EventData[] = [];
      for (let i = 0; i < messageCount; i++) {
        sentEventData.push({
          body: `getIterator test message ${Date.now()} - ${i}`
        });
      }

      const sender = client.createProducer({ partitionId: partitionId });
      try {
        await sender.send(sentEventData);
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );
      const eventIterator = receiver.getEventIterator();

      let messagesReceivedCount = 0;
      const data: ReceivedEventData[] = [];
      for await (const event of eventIterator) {
        data.push(event);
        if (++messagesReceivedCount >= messageCount) {
          break;
        }
      }

      debug("received messages: ", data);
      data.length.should.equal(messageCount, `Failed to receive ${messageCount} expected messages`);
    });

    it("should properly drain if broken out of", async function(): Promise<void> {
      const partitionId = partitionIds[0];

      receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, EventPosition.latest());
      const eventIterator = receiver.getEventIterator();

      const eventPromise = eventIterator.next();

      // wait 65 seconds before sending a message to give underlying receiveBatch a chance to return 0 results
      const raceResult = await Promise.race([delay(65000, "delay"), eventPromise]);

      // the timeout should happen before the event is resolved
      raceResult.should.equal("delay");

      // send an event and ensure the event iterator reads it
      const sender = client.createProducer({ partitionId });
      const expectedBodies: string[] = [];
      const messageCount = 5;
      for (let i = 0; i < messageCount; i++) {
        expectedBodies.push(`Event Iterator Drainage - ${Date.now()} - ${i}`);
      }

      try {
        await sender.send(
          expectedBodies.map(body => {
            return { body };
          })
        );
      } finally {
        await sender.close();
      }

      const events = [];
      events.push((await eventPromise).value);
      for await (const event of eventIterator) {
        events.push(event);
        if (events.length === 5) {
          break;
        }
      }

      events.length.should.equal(5);
      events.forEach((event, index) => {
        event.body.should.equal(expectedBodies[index]);
      });
    });

    it("should not return undefined if no messages are found", async function(): Promise<void> {
      const partitionId = partitionIds[0];

      receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, EventPosition.latest());
      const eventIterator = receiver.getEventIterator({
        // behind the scenes, eventIterator will wait up to 60 seconds before returning.
        // set timeout to 70 seconds to give the iterator a chance to yield a value.
        abortSignal: AbortController.timeout(70000)
      });

      const data: ReceivedEventData[] = [];
      try {
        for await (const event of eventIterator) {
          data.push(event);
          break;
        }
        // no events should have been received, so fail quickly if one was
        throw new Error(`Test failure`);
      } catch (err) {
        data.length.should.equal(0);
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "getEventIterator cancellation - timeout 0" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        const eventIterator = receiver.getEventIterator({ abortSignal });

        for await (const _ of eventIterator) {
        }
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "getEventIterator cancellation - immediate" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortController = new AbortController();
        abortController.abort();
        const eventIterator = receiver.getEventIterator({ abortSignal: abortController.signal });

        for await (const _ of eventIterator) {
        }
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }
    });

    it("should support creating a new iterator after a cancellation", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();
      // send a message that can be received
      const sender = client.createProducer({ partitionId });
      try {
        await sender.send({ body: "getEventIterator post-cancellation - timeout 0" });
      } finally {
        await sender.close();
      }

      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.fromEnqueuedTime(time)
      );

      // abortSignal event listeners will be triggered after synchronous paths are executed
      const abortSignal = AbortController.timeout(0);
      const eventIterator = receiver.getEventIterator({ abortSignal });
      try {
        for await (const _ of eventIterator) {
        }
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
        const events = [];

        const eventIterator2 = receiver.getEventIterator();
        for await (const event of eventIterator2) {
          events.push(event);
          break;
        }

        events.length.should.equal(1);
        events[0].should.haveOwnProperty("body");
      }
    });
  });

  describe("mix and match receive methods", function(): void {
    it("should maintain sequence across calls", function(done: Mocha.Done): void {
      // wrap test to allow mixing async/await with done
      (async (done: Mocha.Done) => {
        const partitionId = partitionIds[0];

        const time = Date.now();
        // ensure messages exist to retrieve
        const messageCount = 25;
        const sentEventData: EventData[] = [];
        for (let i = 0; i < messageCount; i++) {
          sentEventData.push({
            body: `mix and match test messsage ${Date.now()} - ${i}`
          });
        }

        const sender = client.createProducer({ partitionId: partitionId });
        try {
          await sender.send(sentEventData);
        } finally {
          await sender.close();
        }

        const data: ReceivedEventData[] = [];
        receiver = client.createConsumer(
          EventHubClient.defaultConsumerGroupName,
          partitionId,
          EventPosition.fromEnqueuedTime(time)
        );

        // start with iterator
        for await (const event of receiver.getEventIterator()) {
          data.push(event);
          if (data.length >= 5) {
            break;
          }
        }

        // switch to batcher
        (await receiver.receiveBatch(5)).forEach(event => {
          data.push(event);
        });

        // switch to handler
        let handlerReceivedCount = 0;
        const handler = receiver.receive(
          async event => {
            data.push(event);

            if (++handlerReceivedCount >= 5) {
              await handler.stop();

              // get the rest of the messages using another iterator
              for await (const event of receiver!.getEventIterator()) {
                data.push(event);
                if (data.length >= messageCount) {
                  break;
                }
              }

              data.length.should.equal(messageCount, `Failed to receive ${messageCount} expected messages`);

              try {
                data
                  .map(event => event.sequenceNumber)
                  .reduce((prev, current) => {
                    // each sequenceNumber should only be incremented by 1
                    current.should.equal(prev + 1, `Invalid sequence of events`);
                    return current;
                  });
                // test complete
                done();
              } catch (err) {
                done(err);
              }
            }
          },
          err => {
            throw err;
          }
        );
      })(done).catch(done);
    });
  });

  describe("Errors when calling createConsumer", function(): void {
    it("should throw an error if EventPosition is missing", function() {
      try {
        client.createConsumer(EventHubClient.defaultConsumerGroupName, "0", undefined as any);
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(`Missing parameter "eventPosition"`);
      }
    });

    it("should throw an error if consumerGroup is missing", function() {
      try {
        client.createConsumer(undefined as any, "0", EventPosition.earliest());
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(`Missing parameter "consumerGroup"`);
      }
    });

    it("should throw MessagingEntityNotFoundError fr non existing consumer group", function(done: Mocha.Done): void {
      try {
        debug(">>>>>>>> client created.");
        const onMessage = (data: any) => {
          debug(">>>>> data: ", data);
        };
        const onError = (error: any) => {
          debug(">>>>>>>> error occurred", error);
          // sleep for 3 seconds so that receiver link and the session can be closed properly then
          // in aftereach the connection can be closed. closing the connection while the receiver
          // link and it's session are being closed (and the session being removed from rhea's
          // internal map) can create havoc.
          setTimeout(() => {
            done(should.equal(error.name, "MessagingEntityNotFoundError"));
          }, 3000);
        };
        const receiver = client.createConsumer("some-random-name", "0", EventPosition.earliest());
        receiver.receive(onMessage, onError);
        debug(">>>>>>>> attached the error handler on the receiver...");
      } catch (err) {
        debug(">>> Some error", err);
        throw new Error("This code path must not have hit.. " + JSON.stringify(err));
      }
    });
  });

  // describe("with receiverRuntimeMetricEnabled", function (): void {
  //   it("should have ReceiverRuntimeInfo populated", async function (): Promise<void> {
  //     const partitionId = hubInfo.partitionIds[0];
  //     sender = client.createProducer(partitionId);
  //     for (let i = 0; i < 10; i++) {
  //       const ed: EventData = {
  //         body: "Hello awesome world " + i
  //       }
  //       await sender.send(ed);
  //       debug("sent message - " + i);
  //     }
  //     debug("Getting the partition information");
  //     const pInfo = await client.getPartitionProperties(partitionId);
  //     debug("partition info: ", pInfo);
  //     debug("Creating new receiver with offset EndOfStream");
  //     receiver = client.createConsumer(partitionId, { eventPosition: EventPosition.fromStart(), enableReceiverRuntimeMetric: true });
  //     let data = await receiver.receive(1, 10);
  //     debug("receiver.runtimeInfo ", receiver.runtimeInfo);
  //     data.length.should.equal(1);
  //     should.exist(receiver.runtimeInfo);
  //     receiver.runtimeInfo!.lastEnqueuedOffset!.should.equal(pInfo.lastEnqueuedOffset);
  //     receiver.runtimeInfo!.lastSequenceNumber!.should.equal(pInfo.lastSequenceNumber);
  //     receiver.runtimeInfo!.lastEnqueuedTimeUtc!.getTime().should.equal(pInfo.lastEnqueuedTimeUtc.getTime());
  //     receiver.runtimeInfo!.partitionId!.should.equal(pInfo.partitionId);
  //     receiver.runtimeInfo!.retrievalTime!.getTime().should.be.greaterThan(Date.now() - 60000);
  //   });
  // });

  describe("with ownerLevel", function(): void {
    it("should behave correctly when a receiver with lower ownerLevel value is connected after a receiver with higher ownerLevel value to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let ownerLevelRcvr1: ReceiveHandler;
      let ownerLevelRcvr2: ReceiveHandler;
      const onError = (error: MessagingError | Error) => {
        debug(">>>> ownerLevel Receiver 1", error);
        throw new Error("An Error should not have happened for ownerLevel receiver with ownerLevel value 2.");
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> ownerLevel Receiver 1", data);
      };
      const receiver1 = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.latest(),
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
          should.equal(error.name, "ReceiverDisconnectedError");
          ownerLevelRcvr2
            .stop()
            .then(() => receiver2.close())
            .then(() => ownerLevelRcvr1.stop())
            .then(() => receiver1.close())
            .then(() => {
              debug("Successfully closed the ownerLevel receivers 1 and 2.");
              done();
            })
            .catch(err => {
              debug("error occurred while closing the receivers... ", err);
              done();
            });
        };
        const onMsg2 = (data: ReceivedEventData) => {
          debug(">>>> ownerLevel Receiver 2", data);
        };
        const receiver2 = client.createConsumer(
          EventHubClient.defaultConsumerGroupName,
          partitionId,
          EventPosition.latest(),
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
        should.equal(error.name, "ReceiverDisconnectedError");
        ownerLevelRcvr1
          .stop()
          .then(() => receiver1.close())
          .then(() => ownerLevelRcvr2.stop())
          .then(() => receiver2.close())
          .then(() => {
            debug("Successfully closed the ownerLevel receivers 1 and 2.");
            done();
          })
          .catch(err => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> ownerLevel Receiver 1", data);
      };
      const receiver1 = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.latest(),
        {
          ownerLevel: 1
        }
      );
      ownerLevelRcvr1 = receiver1.receive(onMsg, onError);
      debug("Created ownerLevel receiver 1 %s", ownerLevelRcvr1);
      setTimeout(() => {
        const onError2 = (error: MessagingError | Error) => {
          debug(">>>> ownerLevel Receiver 2", error);
          throw new Error("An Error should not have happened for ownerLevel receiver with ownerLevel value 2.");
        };
        const onMsg2 = (data: ReceivedEventData) => {
          debug(">>>> ownerLevel Receiver 2", data);
        };
        receiver2 = client.createConsumer(
          EventHubClient.defaultConsumerGroupName,
          partitionId,
          EventPosition.latest(),
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
        throw new Error("An Error should not have happened for ownerLevel receiver with ownerLevel value 1.");
      };
      const onmsg1 = (data: ReceivedEventData) => {
        debug(">>>> ownerLevel Receiver ", data);
      };
      const receiver1 = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.latest(),
        {
          ownerLevel: 1
        }
      );
      ownerLevelRcvr = receiver1.receive(onmsg1, onerr1);
      debug("Created ownerLevel receiver %s", ownerLevelRcvr);
      const onerr2 = (error: MessagingError | Error) => {
        debug(">>>> non ownerLevel Receiver", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        nonownerLevelRcvr
          .stop()
          .then(() => receiver2.close())
          .then(() => ownerLevelRcvr.stop())
          .then(() => receiver1.close())
          .then(() => {
            debug("Successfully closed the nonownerLevel and ownerLevel receivers");
            done();
          })
          .catch(err => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg2 = (data: ReceivedEventData) => {
        debug(">>>> non ownerLevel Receiver", data);
      };
      const receiver2 = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        partitionId,
        EventPosition.latest()
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
        should.equal(error.name, "ReceiverDisconnectedError");
        nonownerLevelRcvr
          .stop()
          .then(() => receiver1.close())
          .then(() => ownerLevelRcvr.stop())
          .then(() => receiver2.close())
          .then(() => {
            debug("Successfully closed the nonownerLevel and ownerLevel receivers");
            done();
          })
          .catch(err => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg3 = (data: ReceivedEventData) => {
        debug(">>>> non ownerLevel Receiver", data);
      };
      receiver1 = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, EventPosition.latest());
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
          EventHubClient.defaultConsumerGroupName,
          partitionId,
          EventPosition.latest(),
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
    describe("on invalid partition ids like", function(): void {
      const invalidIds = ["XYZ", "-1", "1000", "-"];
      invalidIds.forEach(function(id: string): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            debug("Created receiver and will be receiving messages from partition id ...", id);
            const d = await client
              .createConsumer(EventHubClient.defaultConsumerGroupName, id, EventPosition.latest())
              .receiveBatch(10, 3);
            debug("received messages ", d.length);
            throw new Error("Test failure");
          } catch (err) {
            debug("Receiver received an error", err);
            should.exist(err);
            err.message.should.match(
              /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
            );
          }
        });
      });

      it(`" " should throw an invalid EventHub address error`, async function(): Promise<void> {
        try {
          const id = " ";
          debug("Created receiver and will be receiving messages from partition id ...", id);
          const d = await client
            .createConsumer(EventHubClient.defaultConsumerGroupName, id, EventPosition.latest())
            .receiveBatch(10, 3);
          debug("received messages ", d.length);
          throw new Error("Test failure");
        } catch (err) {
          debug("Receiver received an error", err);
          should.exist(err);
          err.message.should.match(/.*Invalid EventHub address. It must be either of the following.*/gi);
        }
      });

      const invalidIds2 = [""];
      invalidIds2.forEach(function(id: string): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            await client
              .createConsumer(EventHubClient.defaultConsumerGroupName, id, EventPosition.latest())
              .receiveBatch(10, 3);
            throw new Error("Test failure");
          } catch (err) {
            debug(`>>>> Received error - `, err);
            should.exist(err);
          }
        });
      });
    });

    it("should receive 'QuotaExceededError' when attempting to connect more than 5 receivers to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      const rcvHndlrs: ReceiveHandler[] = [];
      const rcvrs: any[] = [];

      // This test does not require recieving any messages.  Just attempting to connect the 6th receiver causes
      // onerr2() to be called with QuotaExceededError.  So it's fastest to use EventPosition.fromEnd().
      // Using EventPosition.fromStart() can cause timeouts or ServiceUnavailableException if the EventHub has
      // a large number of messages.
      const eventPosition = EventPosition.latest();

      debug(">>> Receivers length: ", rcvHndlrs.length);
      for (let i = 1; i <= 5; i++) {
        const rcvrId = `rcvr-${i}`;
        debug(rcvrId);
        const onMsg = (data: ReceivedEventData) => {
          if (!rcvrs[i]) {
            rcvrs[i] = rcvrId;
            debug("receiver id %s", rcvrId);
          }
        };
        const onError = (err: MessagingError | Error) => {
          debug("@@@@ Error received by receiver %s", rcvrId);
          debug(err);
        };
        const rcvHndlr = client
          .createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, eventPosition)
          .receive(onMsg, onError);
        rcvHndlrs.push(rcvHndlr);
      }
      debug(">>> Attached message handlers to each receiver.");
      setTimeout(() => {
        debug(`Created 6th receiver - "rcvr-6"`);
        const onmsg2 = (data: ReceivedEventData) => {
          // debug(data);
        };
        const onerr2 = (err: MessagingError | Error) => {
          debug("@@@@ Error received by receiver rcvr-6");
          debug(err);
          should.equal(err.name, "QuotaExceededError");
          const promises = [];
          for (const rcvr of rcvHndlrs) {
            promises.push(rcvr.stop());
          }
          Promise.all(promises)
            .then(() => {
              debug("Successfully closed all the receivers..");
              done();
            })
            .catch(err => {
              debug("An error occurred while closing the receiver in the 'QuotaExceededError' test.", err);
              done();
            });
        };
        const failedRcvHandler = client
          .createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, eventPosition)
          .receive(onmsg2, onerr2);
        rcvHndlrs.push(failedRcvHandler);
      }, 5000);
    });
  });
}).timeout(90000);
