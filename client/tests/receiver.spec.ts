// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

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
  EventHubRuntimeInformation
} from "../lib";
import { BatchingReceiver } from "../lib/batchingReceiver";
import { ReceiveHandler } from "../lib/streamingReceiver";
import dotenv from "dotenv";
dotenv.config();

describe("EventHub Receiver", function(): void {
  const service = {
    connectionString: process.env.EVENTHUB_CONNECTION_STRING,
    path: process.env.EVENTHUB_NAME
  };
  const client: EventHubClient = EventHubClient.createFromConnectionString(
    service.connectionString!,
    service.path
  );
  let breceiver: BatchingReceiver;
  let hubInfo: EventHubRuntimeInformation;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
    hubInfo = await client.getHubRuntimeInformation();
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

  describe("with partitionId 0 as number", function(): void {
    it("should work for receiveBatch", async function(): Promise<void> {
      const result = await client.receiveBatch(0, 10, 20, {
        eventPosition: EventPosition.fromSequenceNumber(0)
      });
      should.equal(true, Array.isArray(result));
    });

    it("should work for receive", function(done: Mocha.Done): void {
      let rcvHandler: ReceiveHandler;
      let stopCalled = false;
      const onError = (error: any) => {
        debug(">>>> An error occurred: %O", error);
      };
      const onMsg = (data: EventData) => {
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
      rcvHandler = client.receive(0, onMsg, onError, {
        epoch: 1,
        eventPosition: EventPosition.fromOffset("0")
      });
    });
  });

  describe("with EventPosition specified as", function(): void {
    it("'from end of stream' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = hubInfo.partitionIds[0];
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        };
        await client.send(ed, partitionId);
        debug("sent message - " + i);
      }
      debug("Creating new receiver with offset EndOfStream");
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        partitionId,
        { eventPosition: EventPosition.fromEnd() }
      );
      await breceiver.receive(10, 5);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message",
        applicationProperties: {
          stamp: uid
        }
      };
      await client.send(ed, partitionId);
      debug(
        ">>>>>>> Sent the new message after creating the receiver. We should only receive this message."
      );
      const datas = await breceiver.receive(10, 5);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await breceiver.receive(10, 10);
      datas2.length.should.equal(0);
    });

    it("after a particular offset' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = hubInfo.partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      debug(
        `Creating new receiver with last enqueued offset: "${
          pInfo.lastEnqueuedOffset
        }".`
      );
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        parseInt(partitionId),
        { eventPosition: EventPosition.fromOffset(pInfo.lastEnqueuedOffset) }
      );
      debug("Establishing the receiver link...");
      const d = await breceiver.receive(10, 5);
      d.length.should.equal(0);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued offset",
        applicationProperties: {
          stamp: uid
        }
      };
      await client.send(ed, "0");
      debug(
        "Sent the new message after creating the receiver. We should only receive this message."
      );
      const datas = await breceiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await breceiver.receive(10, 10);
      datas2.length.should.equal(0);
    });

    it("after a particular offset with isInclusive true' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = hubInfo.partitionIds[0];
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued offset",
        applicationProperties: {
          stamp: uid
        }
      };
      await client.send(ed, partitionId);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionInformation(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after last enqueued offset",
        applicationProperties: {
          stamp: uid2
        }
      };
      await client.send(ed2, partitionId);
      debug(
        `Sent message 2 with stamp: ${uid} after getting the enqueued offset.`
      );
      debug(
        `Creating new receiver with last enqueued offset: "${
          pInfo.lastEnqueuedOffset
        }".`
      );
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        partitionId,
        {
          eventPosition: EventPosition.fromOffset(
            pInfo.lastEnqueuedOffset,
            true
          )
        }
      );
      debug("We should receive the last 2 messages.");
      const datas = await breceiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(2);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      datas[1].applicationProperties!.stamp.should.equal(uid2);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await breceiver.receive(10, 5);
      datas2.length.should.equal(0);
    });

    it("'from a particular enqueued time' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = hubInfo.partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      debug(
        `Creating new receiver with last enqueued time: "${
          pInfo.lastEnqueuedTimeUtc
        }".`
      );
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        partitionId,
        {
          eventPosition: EventPosition.fromEnqueuedTime(
            pInfo.lastEnqueuedTimeUtc
          )
        }
      );
      debug("Establishing the receiver link...");
      const d = await breceiver.receive(10, 5);
      d.length.should.equal(0);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body:
          "New message after last enqueued time " + pInfo.lastEnqueuedTimeUtc,
        applicationProperties: {
          stamp: uid
        }
      };
      await client.send(ed, partitionId);
      debug(
        "Sent the new message after creating the receiver. We should only receive this message."
      );
      const datas = await breceiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await breceiver.receive(10, 5);
      datas2.length.should.equal(0);
    });

    it("'after the particular sequence number' should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = hubInfo.partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body:
          "New message after last enqueued sequence number " +
          pInfo.lastSequenceNumber,
        applicationProperties: {
          stamp: uid
        }
      };
      await client.send(ed, partitionId);
      debug(
        "Sent the new message after getting the partition runtime information. We should only receive this message."
      );
      debug(
        `Creating new receiver with last enqueued sequence number: "${
          pInfo.lastSequenceNumber
        }".`
      );
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        partitionId,
        {
          eventPosition: EventPosition.fromSequenceNumber(
            pInfo.lastSequenceNumber
          )
        }
      );
      const datas = await breceiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await breceiver.receive(10, 5);
      datas2.length.should.equal(0);
    });

    it("'after the particular sequence number' with isInclusive true should receive messages correctly", async function(): Promise<
      void
    > {
      const partitionId = hubInfo.partitionIds[0];
      const uid = uuid();
      const ed: EventData = {
        body: "New message before getting the last sequence number",
        applicationProperties: {
          stamp: uid
        }
      };
      await client.send(ed, partitionId);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionInformation(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after the last enqueued offset",
        applicationProperties: {
          stamp: uid2
        }
      };
      await client.send(ed2, partitionId);
      debug(`Sent message 2 with stamp: ${uid}.`);
      debug(
        `Creating new receiver with last sequence number: "${
          pInfo.lastSequenceNumber
        }".`
      );
      breceiver = BatchingReceiver.create(
        (client as any)._context,
        partitionId,
        {
          eventPosition: EventPosition.fromSequenceNumber(
            pInfo.lastSequenceNumber,
            true
          )
        }
      );
      debug("We should receive the last 2 messages.");
      const datas = await breceiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(2);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      datas[1].applicationProperties!.stamp.should.equal(uid2);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await breceiver.receive(10, 5);
      datas2.length.should.equal(0);
    });
  });

  describe("in batch mode", function(): void {
    it("should receive messages correctly", async function(): Promise<void> {
      const partitionId = hubInfo.partitionIds[0];
      const datas = await client.receiveBatch(partitionId, 5, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(5);
    });
  });

  // describe("with receiverRuntimeMetricEnabled", function () {
  //   it("should have ReceiverRuntimeInfo populated", async function () {
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
  //     let datas = await receiver.receive(1, 10);
  //     debug("receiver.runtimeInfo ", receiver.runtimeInfo);
  //     datas.length.should.equal(1);
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
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr1: ReceiveHandler;
      let epochRcvr2: ReceiveHandler;
      const onError = (error: any) => {
        debug(">>>> epoch Receiver 1", error);
        throw new Error(
          "An Error should not have happened for epoch receiver with epoch value 2."
        );
      };
      const onMsg = (data: EventData) => {
        debug(">>>> epoch Receiver 1", data);
      };
      epochRcvr1 = client.receive(partitionId, onMsg, onError, {
        epoch: 2,
        eventPosition: EventPosition.fromEnd()
      });
      debug("Created epoch receiver 1 %s", epochRcvr1.name);
      setTimeout(() => {
        const onError2 = (error: any) => {
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
            .catch((err) => {
              debug("error occurred while closing the receivers... ", err);
              done();
            });
        };
        const onMsg2 = (data: EventData) => {
          debug(">>>> epoch Receiver 2", data);
        };
        epochRcvr2 = client.receive(partitionId, onMsg2, onError2, {
          epoch: 1,
          eventPosition: EventPosition.fromEnd()
        });
        debug("Created epoch receiver 2 %s", epochRcvr2.name);
      }, 3000);
    });

    it("should behave correctly when a receiver with higher epoch value is connected after a receiver with lower epoch value to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr1: ReceiveHandler;
      let epochRcvr2: ReceiveHandler;
      const onError = (error: any) => {
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
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onMsg = (data: EventData) => {
        debug(">>>> epoch Receiver 1", data);
      };
      epochRcvr1 = client.receive(partitionId, onMsg, onError, {
        epoch: 1,
        eventPosition: EventPosition.fromEnd()
      });
      debug("Created epoch receiver 1 %s", epochRcvr1.name);
      setTimeout(() => {
        const onError2 = (error: any) => {
          debug(">>>> epoch Receiver 2", error);
          throw new Error(
            "An Error should not have happened for epoch receiver with epoch value 2."
          );
        };
        const onMsg2 = (data: EventData) => {
          debug(">>>> epoch Receiver 2", data);
        };
        epochRcvr2 = client.receive(partitionId, onMsg2, onError2, {
          epoch: 2,
          eventPosition: EventPosition.fromEnd()
        });
        debug("Created epoch receiver 2 %s", epochRcvr2.name);
      }, 3000);
    });

    it("should behave correctly when a non epoch receiver is created after an epoch receiver", function(done: Mocha.Done): void {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr: ReceiveHandler;
      let nonEpochRcvr: ReceiveHandler;
      const onerr1 = (error: any) => {
        debug(">>>> epoch Receiver ", error);
        throw new Error(
          "An Error should not have happened for epoch receiver with epoch value 1."
        );
      };
      const onmsg1 = (data: EventData) => {
        debug(">>>> epoch Receiver ", data);
      };
      epochRcvr = client.receive(partitionId, onmsg1, onerr1, {
        epoch: 1,
        eventPosition: EventPosition.fromEnd()
      });
      debug("Created epoch receiver %s", epochRcvr.name);
      const onerr2 = (error: any) => {
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
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg2 = (data: EventData) => {
        debug(">>>> non epoch Receiver", data);
      };
      nonEpochRcvr = client.receive(partitionId, onmsg2, onerr2, {
        eventPosition: EventPosition.fromEnd()
      });
      debug("Created non epoch receiver %s", nonEpochRcvr.name);
    });

    it("should behave correctly when an epoch receiver is created after a non epoch receiver", function(done: Mocha.Done): void {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr: ReceiveHandler;
      let nonEpochRcvr: ReceiveHandler;
      const onerr3 = (error: any) => {
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
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg3 = (data: EventData) => {
        debug(">>>> non epoch Receiver", data);
      };
      nonEpochRcvr = client.receive(partitionId, onmsg3, onerr3, {
        eventPosition: EventPosition.fromEnd()
      });
      debug("Created non epoch receiver %s", nonEpochRcvr.name);
      setTimeout(() => {
        const onerr4 = (error: any) => {
          debug(">>>> epoch Receiver ", error);
          throw new Error(
            "OnErr4 >> An Error should not have happened for epoch receiver with epoch value 1."
          );
        };
        const onmsg4 = (data: EventData) => {
          debug(">>>> epoch Receiver ", data);
        };
        epochRcvr = client.receive(partitionId, onmsg4, onerr4, {
          epoch: 1,
          eventPosition: EventPosition.fromEnd()
        });
        debug("Created epoch receiver %s", epochRcvr.name);
      }, 3000);
    });
  });

  describe("Negative scenarios", function(): void {
    describe("on invalid partition ids like", function(): void {
      const invalidIds = ["XYZ", "-1", "1000", "-"];
      invalidIds.forEach(function(id: string): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            debug(
              "Created receiver and will be receiving messages from partition id ...",
              id
            );
            const d = await client.receiveBatch(id, 10, 3);
            debug("received messages ", d.length);
          } catch (err) {
            debug("Receiver received an error", err);
            should.exist(err);
            err.message.should.match(/.*The specified partition is invalid for an EventHub partition sender or receiver.*/ig);
          }
        });
      });

      it(`" " should throw an invalid EventHub address error`, async function (): Promise<void> {
        try {
          const id = " ";
          debug("Created receiver and will be receiving messages from partition id ...", id);
          const d = await client.receiveBatch(id, 10, 3);
          debug("received messages ", d.length);
        } catch (err) {
          debug("Receiver received an error", err);
          should.exist(err);
          err.message.should.match(/.*Invalid EventHub address. It must be either of the following.*/ig);
        }
      });

      const invalidIds2 = [""];
      invalidIds2.forEach(function (id: string): void {
        it(`"${id}" should throw an error`, async function (): Promise<void> {
          try {
            await client.receiveBatch(id, 10, 3);
          } catch (err) {
            debug(`>>>> Received error - `, err);
            should.exist(err);
          }
        });
      });
    });

    it("should receive 'QuotaExceededError' when attempting to connect more than 5 receivers to a partition in a consumer group", function(done: Mocha.Done): void {
      const partitionId = hubInfo.partitionIds[0];
      const rcvHndlrs: ReceiveHandler[] = [];
      const rcvrs: any[] = [];
      debug(">>> Receivers length: ", rcvHndlrs.length);
      for (let i = 1; i <= 5; i++) {
        const rcvrId = `rcvr-${i}`;
        debug(rcvrId);
        const onMsg = (data: EventData) => {
          if (!rcvrs[i]) {
            rcvrs[i] = rcvrId;
            debug("receiver id %s", rcvrId);
          }
        };
        const onError = (err: any) => {
          debug("@@@@ Error received by receiver %s", rcvrId);
          debug(err);
        };
        const rcvHndlr = client.receive(partitionId, onMsg, onError, {
          eventPosition: EventPosition.fromStart(),
          identifier: rcvrId
        });
        rcvHndlrs.push(rcvHndlr);
      }
      debug(">>> Attached message handlers to each receiver.");
      setTimeout(() => {
        debug(`Created 6th receiver - "rcvr-6"`);
        const onmsg2 = (data: EventData) => {
          // debug(data);
        };
        const onerr2 = (err: any) => {
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
            .catch((err) => {
              debug(
                "An error occurred while closing the receiver in the 'QuotaExceededError' test.",
                err
              );
              done();
            });
        };
        const failedRcvHandler = client.receive(partitionId, onmsg2, onerr2, {
          eventPosition: EventPosition.fromStart(),
          identifier: "rcvr-6"
        });
        rcvHndlrs.push(failedRcvHandler);
      }, 5000);
    });
  });
}).timeout(60000);
