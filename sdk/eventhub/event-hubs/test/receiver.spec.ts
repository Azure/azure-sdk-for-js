// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import uuid from "uuid/v4";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:receiver-spec");
import { EventPosition, EventHubClient, EventData, MessagingError, ReceivedEventData, EventReceiver } from "../src";
import { BatchingReceiver } from "../src/batchingReceiver";
import { ReceiveHandler } from "../src/streamingReceiver";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

describe("EventHub Receiver #RunnableInBrowser", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
  let breceiver: BatchingReceiver;
  let receiver: EventReceiver | undefined;
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
    it("should work for receiveBatch", async function(): Promise<void> {
      receiver = client.createReceiver(partitionIds[0], { beginReceivingAt: EventPosition.fromSequenceNumber(0) });
      const result = await receiver.receiveBatch(10, 20);
      should.equal(true, Array.isArray(result));
    });

    it("should work for receive", function(done: Mocha.Done): void {
      let rcvHandler: ReceiveHandler;
      let stopCalled = false;
      const onError = (error: MessagingError | Error) => {
        debug(">>>> An error occurred: %O", error);
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> Received Data: %O", data);
        if (!stopCalled) {
          stopCalled = true;
          rcvHandler
            .stop()
            .then(() => {
              done();
            })
            .catch(() => {
              done();
            });
        }
      };
      rcvHandler = client
        .createReceiver(partitionIds[0], {
          exclusiveReceiverPriority: 1,
          beginReceivingAt: EventPosition.fromOffset("0")
        })
        .receive(onMsg, onError);
    });
  });

  describe("with EventPosition specified as", function(): void {
    // TODO: Enable following test as part of https://github.com/Azure/azure-sdk-for-js/issues/3714
    // After we ensure the multiple receiveBatch calls on the user facing receiver work as expected
    /*
    it("'from end of stream' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const events: EventData[] = [];
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        };
        events.push(ed);
      }
      await client.createSender({ partitionId: partitionId }).send(events);
      debug("Creating new receiver with offset EndOfStream");
      breceiver = BatchingReceiver.create((client as any)._context, partitionId, {
        beginReceivingAt: EventPosition.fromNewEventsOnly()
      });
      const data1 = await breceiver.receive(10, 10);
      data1.length.should.equal(0, "Unexpected message received when using EventPosition.fromEnd()");
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message",
        properties: {
          stamp: uid
        }
      };
      await client.createSender({ partitionId: partitionId }).send([ed]);
      debug(">>>>>>> Sent the new message after creating the receiver. We should only receive this message.");
      const data2 = await breceiver.receive(10, 20);
      debug("received messages: ", data2);
      data2.length.should.equal(1, "Failed to receive the expected one single message");
      data2[0].properties!.stamp.should.equal(uid, "Message received with unexpected uid");
      debug("Next receive on this partition should not receive any messages.");
      const data3 = await breceiver.receive(10, 10);
      data3.length.should.equal(0, "Unexpected message received");
    });
    */
   
    it("'after a particular offset' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
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
      await client.createSender({ partitionId: partitionId }).send([ed]);
      debug("Sent the new message after creating the receiver. We should only receive this message.");
      const receiver = client.createReceiver(partitionId, {
        beginReceivingAt: EventPosition.fromOffset(pInfo.lastEnqueuedOffset)
      });
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
      await client.createSender({ partitionId: partitionId }).send([ed]);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionInformation(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after last enqueued offset",
        properties: {
          stamp: uid2
        }
      };
      await client.createSender({ partitionId: partitionId }).send([ed2]);
      debug(`Sent message 2 with stamp: ${uid} after getting the enqueued offset.`);
      debug(`Creating new receiver with last enqueued offset: "${pInfo.lastEnqueuedOffset}".`);
      breceiver = BatchingReceiver.create((client as any)._context, partitionId, {
        beginReceivingAt: EventPosition.fromOffset(pInfo.lastEnqueuedOffset, true)
      });
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
      const pInfo = await client.getPartitionInformation(partitionId);
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
      await client.createSender({ partitionId: partitionId }).send([ed]);
      debug("Sent the new message after creating the receiver. We should only receive this message.");

      const receiver = client.createReceiver(partitionId, {
        beginReceivingAt: EventPosition.fromEnqueuedTime(pInfo.lastEnqueuedTimeUtc)
      });
      const data = await receiver.receiveBatch(10, 20);
      debug("received messages: ", data);
      data.length.should.equal(1, "Failed to received the expected single message");
      data[0].properties!.stamp.should.equal(uid);
    });

    it("'after the particular sequence number' should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued sequence number " + pInfo.lastEnqueuedSequenceNumber,
        properties: {
          stamp: uid
        }
      };
      await client.createSender({ partitionId: partitionId }).send([ed]);
      debug(
        "Sent the new message after getting the partition runtime information. We should only receive this message."
      );
      debug(`Creating new receiver with last enqueued sequence number: "${pInfo.lastEnqueuedSequenceNumber}".`);
      breceiver = BatchingReceiver.create((client as any)._context, partitionId, {
        beginReceivingAt: EventPosition.fromSequenceNumber(pInfo.lastEnqueuedSequenceNumber)
      });
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
      await client.createSender({ partitionId: partitionId }).send([ed]);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionInformation(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after the last enqueued offset",
        properties: {
          stamp: uid2
        }
      };
      await client.createSender({ partitionId: partitionId }).send([ed2]);
      debug(`Sent message 2 with stamp: ${uid}.`);
      debug(`Creating new receiver with last sequence number: "${pInfo.lastEnqueuedSequenceNumber}".`);
      breceiver = BatchingReceiver.create((client as any)._context, partitionId, {
        beginReceivingAt: EventPosition.fromSequenceNumber(pInfo.lastEnqueuedSequenceNumber, true)
      });
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

  describe("in batch mode", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      receiver = client.createReceiver(partitionId);
      const data = await receiver.receiveBatch(5, 10);
      debug("received messages: ", data);
      data.length.should.equal(5, "Failed to receive five expected messages");
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

      const sender = client.createSender({ partitionId: partitionId });
      try {
        await sender.send(sentEventData);
      } finally {
        await sender.close();
      }

      receiver = client.createReceiver(partitionId, {
        beginReceivingAt: EventPosition.fromEnqueuedTime(time)
      });
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

        const sender = client.createSender({ partitionId: partitionId });
        try {
          await sender.send(sentEventData);
        } finally {
          await sender.close();
        }

        const data: ReceivedEventData[] = [];
        receiver = client.createReceiver(partitionId, {
          beginReceivingAt: EventPosition.fromEnqueuedTime(time)
        });

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

  // describe("with receiverRuntimeMetricEnabled", function (): void {
  //   it("should have ReceiverRuntimeInfo populated", async function (): Promise<void> {
  //     const partitionId = hubInfo.partitionIds[0];
  //     sender = client.createSender(partitionId);
  //     for (let i = 0; i < 10; i++) {
  //       const ed: EventData = {
  //         body: "Hello awesome world " + i
  //       }
  //       await sender.send(ed);
  //       debug("sent message - " + i);
  //     }
  //     debug("Getting the partition information");
  //     const pInfo = await client.getPartitionInformation(partitionId);
  //     debug("partition info: ", pInfo);
  //     debug("Creating new receiver with offset EndOfStream");
  //     receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), enableReceiverRuntimeMetric: true });
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

  describe("with epoch", function(): void {
    it("should behave correctly when a receiver with lower epoch value is connected after a receiver with higher epoch value to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let epochRcvr1: ReceiveHandler;
      let epochRcvr2: ReceiveHandler;
      const onError = (error: MessagingError | Error) => {
        debug(">>>> epoch Receiver 1", error);
        throw new Error("An Error should not have happened for epoch receiver with epoch value 2.");
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> epoch Receiver 1", data);
      };
      epochRcvr1 = client
        .createReceiver(partitionId, {
          exclusiveReceiverPriority: 2,
          beginReceivingAt: EventPosition.fromNewEventsOnly()
        })
        .receive(onMsg, onError);
      debug("Created epoch receiver 1 %s", epochRcvr1);
      setTimeout(() => {
        const onError2 = (error: MessagingError | Error) => {
          debug(">>>> epoch Receiver 2", error);
          should.exist(error);
          should.equal(error.name, "ReceiverDisconnectedError");
          epochRcvr2
            .stop()
            .then(() => epochRcvr1.stop())
            .then(() => {
              debug("Successfully closed the epoch receivers 1 and 2.");
              done();
            })
            .catch(err => {
              debug("error occurred while closing the receivers... ", err);
              done();
            });
        };
        const onMsg2 = (data: ReceivedEventData) => {
          debug(">>>> epoch Receiver 2", data);
        };
        epochRcvr2 = client
          .createReceiver(partitionId, {
            exclusiveReceiverPriority: 1,
            beginReceivingAt: EventPosition.fromNewEventsOnly()
          })
          .receive(onMsg2, onError2);
        debug("Created epoch receiver 2 %s", epochRcvr2);
      }, 3000);
    });

    it("should behave correctly when a receiver with higher epoch value is connected after a receiver with lower epoch value to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let epochRcvr1: ReceiveHandler;
      let epochRcvr2: ReceiveHandler;
      const onError = (error: MessagingError | Error) => {
        debug(">>>> epoch Receiver 1", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        epochRcvr1
          .stop()
          .then(() => epochRcvr2.stop())
          .then(() => {
            debug("Successfully closed the epoch receivers 1 and 2.");
            done();
          })
          .catch(err => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onMsg = (data: ReceivedEventData) => {
        debug(">>>> epoch Receiver 1", data);
      };
      epochRcvr1 = client
        .createReceiver(partitionId, {
          exclusiveReceiverPriority: 1,
          beginReceivingAt: EventPosition.fromNewEventsOnly()
        })
        .receive(onMsg, onError);
      debug("Created epoch receiver 1 %s", epochRcvr1);
      setTimeout(() => {
        const onError2 = (error: MessagingError | Error) => {
          debug(">>>> epoch Receiver 2", error);
          throw new Error("An Error should not have happened for epoch receiver with epoch value 2.");
        };
        const onMsg2 = (data: ReceivedEventData) => {
          debug(">>>> epoch Receiver 2", data);
        };
        epochRcvr2 = client
          .createReceiver(partitionId, {
            exclusiveReceiverPriority: 2,
            beginReceivingAt: EventPosition.fromNewEventsOnly()
          })
          .receive(onMsg2, onError2);
        debug("Created epoch receiver 2 %s", epochRcvr2);
      }, 3000);
    });

    it("should behave correctly when a non epoch receiver is created after an epoch receiver", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let epochRcvr: ReceiveHandler;
      let nonEpochRcvr: ReceiveHandler;
      const onerr1 = (error: MessagingError | Error) => {
        debug(">>>> epoch Receiver ", error);
        throw new Error("An Error should not have happened for epoch receiver with epoch value 1.");
      };
      const onmsg1 = (data: ReceivedEventData) => {
        debug(">>>> epoch Receiver ", data);
      };
      epochRcvr = client
        .createReceiver(partitionId, {
          exclusiveReceiverPriority: 1,
          beginReceivingAt: EventPosition.fromNewEventsOnly()
        })
        .receive(onmsg1, onerr1);
      debug("Created epoch receiver %s", epochRcvr);
      const onerr2 = (error: MessagingError | Error) => {
        debug(">>>> non epoch Receiver", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        nonEpochRcvr
          .stop()
          .then(() => epochRcvr.stop())
          .then(() => {
            debug("Successfully closed the nonEpoch and epoch receivers");
            done();
          })
          .catch(err => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg2 = (data: ReceivedEventData) => {
        debug(">>>> non epoch Receiver", data);
      };
      nonEpochRcvr = client
        .createReceiver(partitionId, {
          beginReceivingAt: EventPosition.fromNewEventsOnly()
        })
        .receive(onmsg2, onerr2);
      debug("Created non epoch receiver %s", nonEpochRcvr);
    });

    it("should behave correctly when an epoch receiver is created after a non epoch receiver", function(done: Mocha.Done): void {
      const partitionId = partitionIds[0];
      let epochRcvr: ReceiveHandler;
      let nonEpochRcvr: ReceiveHandler;
      const onerr3 = (error: MessagingError | Error) => {
        debug(">>>> non epoch Receiver", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        nonEpochRcvr
          .stop()
          .then(() => epochRcvr.stop())
          .then(() => {
            debug("Successfully closed the nonEpoch and epoch receivers");
            done();
          })
          .catch(err => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg3 = (data: ReceivedEventData) => {
        debug(">>>> non epoch Receiver", data);
      };
      nonEpochRcvr = client
        .createReceiver(partitionId, {
          beginReceivingAt: EventPosition.fromNewEventsOnly()
        })
        .receive(onmsg3, onerr3);
      debug("Created non epoch receiver %s", nonEpochRcvr);
      setTimeout(() => {
        const onerr4 = (error: MessagingError | Error) => {
          debug(">>>> epoch Receiver ", error);
          throw new Error("OnErr4 >> An Error should not have happened for epoch receiver with epoch value 1.");
        };
        const onmsg4 = (data: ReceivedEventData) => {
          debug(">>>> epoch Receiver ", data);
        };
        epochRcvr = client
          .createReceiver(partitionId, {
            exclusiveReceiverPriority: 1,
            beginReceivingAt: EventPosition.fromNewEventsOnly()
          })
          .receive(onmsg4, onerr4);
        debug("Created epoch receiver %s", epochRcvr);
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
            const d = await client.createReceiver(id).receiveBatch(10, 3);
            debug("received messages ", d.length);
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
          const d = await client.createReceiver(id).receiveBatch(10, 3);
          debug("received messages ", d.length);
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
            await client.createReceiver(id).receiveBatch(10, 3);
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
      const eventPosition = EventPosition.fromNewEventsOnly();

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
          .createReceiver(partitionId, { beginReceivingAt: eventPosition })
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
          .createReceiver(partitionId, { beginReceivingAt: eventPosition })
          .receive(onmsg2, onerr2);
        rcvHndlrs.push(failedRcvHandler);
      }, 5000);
    });
  });
}).timeout(90000);
