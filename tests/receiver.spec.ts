// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
import * as uuid from "uuid/v4";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:receiver-spec");
import { EventPosition, EventHubClient, EventHubReceiver, EventData, EventHubRuntimeInformation, EventHubSender } from "../lib";
import { delay } from "../lib/util/utils";

describe("EventHub Receiver", function () {
  this.timeout(30000);
  const service = { connectionString: process.env.EVENTHUB_CONNECTION_STRING, path: process.env.EVENTHUB_NAME };
  let client: EventHubClient = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
  let receiver: EventHubReceiver;
  let sender: EventHubSender;
  let hubInfo: EventHubRuntimeInformation;
  before("validate environment", async function () {
    should.exist(process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.");
    should.exist(process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests.");
    hubInfo = await client.getHubRuntimeInformation();
  });

  after("close the connection", async function () {
    await client.close();
  });

  afterEach("close the sender link", async function () {
    if (sender) {
      await sender.close();
      debug("Sender closed.");
    }
    if (receiver) {
      await receiver.close();
      debug("Receiver closed.");
    }
  });

  describe("with EventPosition specified as", function () {
    it("'from end of stream' should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      sender = client.createSender(partitionId);
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        }
        await sender.send(ed);
        debug("sent message - " + i);
      }
      debug("Creating new receiver with offset EndOfStream");
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnd() });
      debug("Establishing the receiver link...");
      const d = await receiver.receive(10, 3);
      d.length.should.equal(0);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message",
        applicationProperties: {
          stamp: uid
        }
      }
      await sender.send(ed);
      debug(">>>>>>> Sent the new message after creating the receiver. We should only receive this message.");
      const datas = await receiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await receiver.receive(10, 10);
      datas2.length.should.equal(0);
    });

    it("'after a particular offset' should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      sender = client.createSender(partitionId);
      debug(`Creating new receiver with last enqueued offset: "${pInfo.lastEnqueuedOffset}".`);
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromOffset(pInfo.lastEnqueuedOffset) });
      debug("Establishing the receiver link...");
      const d = await receiver.receive(10, 5);
      d.length.should.equal(0);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued offset",
        applicationProperties: {
          stamp: uid
        }
      }
      await sender.send(ed);
      debug("Sent the new message after creating the receiver. We should only receive this message.");
      const datas = await receiver.receive(10, 5);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await receiver.receive(10, 10);
      datas2.length.should.equal(0);
    });

    it("'after a particular offset with isInclusive true' should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      sender = client.createSender(partitionId);
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued offset",
        applicationProperties: {
          stamp: uid
        }
      }
      await sender.send(ed);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionInformation(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after last enqueued offset",
        applicationProperties: {
          stamp: uid2
        }
      }
      await sender.send(ed2);
      debug(`Sent message 2 with stamp: ${uid} after getting the enqueued offset.`);
      debug(`Creating new receiver with last enqueued offset: "${pInfo.lastEnqueuedOffset}".`);
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromOffset(pInfo.lastEnqueuedOffset, true) });
      debug("We should receive the last 2 messages.");
      const datas = await receiver.receive(10, 5);
      debug("received messages: ", datas);
      datas.length.should.equal(2);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      datas[1].applicationProperties!.stamp.should.equal(uid2);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await receiver.receive(10, 10);
      datas2.length.should.equal(0);
    });

    it("'from a particular enqueued time' should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      sender = client.createSender(partitionId);
      debug(`Creating new receiver with last enqueued time: "${pInfo.lastEnqueuedTimeUtc}".`);
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnqueuedTime(pInfo.lastEnqueuedTimeUtc) });
      debug("Establishing the receiver link...");
      const d = await receiver.receive(10, 3);
      d.length.should.equal(0);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued time " + pInfo.lastEnqueuedTimeUtc,
        applicationProperties: {
          stamp: uid
        }
      }
      await sender.send(ed);
      debug("Sent the new message after creating the receiver. We should only receive this message.");
      const datas = await receiver.receive(10, 5);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await receiver.receive(10, 15);
      datas2.length.should.equal(0);
    });

    it("'after the particular sequence number' should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      const pInfo = await client.getPartitionInformation(partitionId);
      sender = client.createSender(partitionId);
      // send a new message. We should only receive this new message.
      const uid = uuid();
      const ed: EventData = {
        body: "New message after last enqueued sequence number " + pInfo.lastSequenceNumber,
        applicationProperties: {
          stamp: uid
        }
      }
      await sender.send(ed);
      debug("Sent the new message after getting the partition runtime information. We should only receive this message.");
      debug(`Creating new receiver with last enqueued sequence number: "${pInfo.lastSequenceNumber}".`);
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromSequenceNumber(pInfo.lastSequenceNumber) });
      const datas = await receiver.receive(10, 15);
      debug("received messages: ", datas);
      datas.length.should.equal(1);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await receiver.receive(10, 10);
      datas2.length.should.equal(0);
    });

    it("'after the particular sequence number' with isInclusive true should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      sender = client.createSender(partitionId);
      const uid = uuid();
      const ed: EventData = {
        body: "New message before getting the last sequence number",
        applicationProperties: {
          stamp: uid
        }
      }
      await sender.send(ed);
      debug(`Sent message 1 with stamp: ${uid}.`);
      const pInfo = await client.getPartitionInformation(partitionId);
      const uid2 = uuid();
      const ed2: EventData = {
        body: "New message after the last enqueued offset",
        applicationProperties: {
          stamp: uid2
        }
      }
      await sender.send(ed2);
      debug(`Sent message 2 with stamp: ${uid}.`);
      debug(`Creating new receiver with last sequence number: "${pInfo.lastSequenceNumber}".`);
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromSequenceNumber(pInfo.lastSequenceNumber, true) });
      debug("We should receive the last 2 messages.");
      const datas = await receiver.receive(10, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(2);
      datas[0].applicationProperties!.stamp.should.equal(uid);
      datas[1].applicationProperties!.stamp.should.equal(uid2);
      debug("Next receive on this partition should not receive any messages.");
      const datas2 = await receiver.receive(10, 10);
      datas2.length.should.equal(0);
    });
  });

  describe("in batch mode", function () {
    it("should receive messages correctly", async function () {
      const partitionId = hubInfo.partitionIds[0];
      receiver = client.createReceiver(partitionId);
      const datas = await receiver.receive(5, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(5);
    });
  });

  describe("with receiverRuntimeMetricEnabled", function () {
    it("should have ReceiverRuntimeInfo populated", async function () {
      const partitionId = hubInfo.partitionIds[0];
      sender = client.createSender(partitionId);
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        }
        await sender.send(ed);
        debug("sent message - " + i);
      }
      debug("Getting the partition information");
      const pInfo = await client.getPartitionInformation(partitionId);
      debug("paritition info: ", pInfo);
      debug("Creating new receiver with offset EndOfStream");
      receiver = client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), enableReceiverRuntimeMetric: true });
      let datas = await receiver.receive(1, 10);
      debug("receiver.runtimeInfo ", receiver.runtimeInfo);
      datas.length.should.equal(1);
      should.exist(receiver.runtimeInfo);
      receiver.runtimeInfo!.lastEnqueuedOffset!.should.equal(pInfo.lastEnqueuedOffset);
      receiver.runtimeInfo!.lastSequenceNumber!.should.equal(pInfo.lastSequenceNumber);
      receiver.runtimeInfo!.lastEnqueuedTimeUtc!.getTime().should.equal(pInfo.lastEnqueuedTimeUtc.getTime());
      receiver.runtimeInfo!.partitionId!.should.equal(pInfo.partitionId);
      receiver.runtimeInfo!.retrievalTime!.getTime().should.be.greaterThan(Date.now() - 60000);
    });
  });

  describe("with epoch", function () {
    it("should behave correctly when 2 epoch receivers with different values are connecting to a partition in a consumer group", function (done) {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr1: EventHubReceiver, epochRcvr2: EventHubReceiver;
      let events: EventData[] = [];
      epochRcvr1 = client.createReceiver(partitionId, { epoch: 1, eventPosition: EventPosition.fromEnd() });
      const onError = (error) => {
        debug(">>>> epoch Receiver 1", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        epochRcvr1.close()
          .then(() => epochRcvr2.close())
          .then(() => {
            debug("Successfully closed the epoch receivers 1 and 2.");
            done();
          })
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onMsg = (data) => {
        debug(">>>> epoch Receiver 1", data);
      };
      epochRcvr1.start(onMsg, onError);
      debug("Created epoch receiver 1 %s", epochRcvr1.name);
      setTimeout(() => {
        epochRcvr2 = client.createReceiver(partitionId, { epoch: 2, eventPosition: EventPosition.fromEnd() });
        const onError2 = (error) => {
          debug(">>>> epoch Receiver 2", error);
          throw new Error("An Error should not have happened for epoch receiver with epoch value 2.");
        };
        const onMsg2 = (data) => {
          debug(">>>> epoch Receiver 2", data);
        };
        epochRcvr2.start(onMsg, onError);
        debug("Created epoch receiver 2 %s", epochRcvr2.name);
      }, 3000);
    });

    it("should behave correctly when a non epoch receiver is created after an epoch receiver", function (done) {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr: EventHubReceiver, nonEpochRcvr: EventHubReceiver;
      let events: EventData[] = [];
      epochRcvr = client.createReceiver(partitionId, { epoch: 1, eventPosition: EventPosition.fromEnd() });
      const onerr1 = (error) => {
        debug(">>>> epoch Receiver ", error);
        throw new Error("An Error should not have happened for epoch receiver with epoch value 1.");
      };
      const onmsg1 = (data) => {
        debug(">>>> epoch Receiver ", data);
      };
      epochRcvr.start(onmsg1, onerr1);
      debug("Created epoch receiver %s", epochRcvr.name);
      nonEpochRcvr = client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnd() });
      const onerr2 = (error) => {
        debug(">>>> non epoch Receiver", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        nonEpochRcvr.close()
          .then(() => epochRcvr.close())
          .then(() => {
            debug("Successfully closed the nonEpoch and epoch receivers");
            done();
          })
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg2 = (data) => {
        debug(">>>> non epoch Receiver", data);
      };
      nonEpochRcvr.start(onmsg2, onerr2);
      debug("Created non epoch receiver %s", nonEpochRcvr.name);
    });

    it("should behave correctly when an epoch receiver is created after a non epoch receiver", function (done) {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr: EventHubReceiver, nonEpochRcvr: EventHubReceiver;
      let events: EventData[] = [];
      nonEpochRcvr = client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnd() });
      const onerr3 = (error) => {
        debug(">>>> non epoch Receiver", error);
        should.exist(error);
        should.equal(error.name, "ReceiverDisconnectedError");
        nonEpochRcvr.close()
          .then(() => epochRcvr.close())
          .then(() => {
            debug("Successfully closed the nonEpoch and epoch receivers");
            done();
          })
          .catch((err) => {
            debug("error occurred while closing the receivers... ", err);
            done();
          });
      };
      const onmsg3 = (data) => {
        debug(">>>> non epoch Receiver", data);
      };
      nonEpochRcvr.start(onmsg3, onerr3);
      debug("Created non epoch receiver %s", nonEpochRcvr.name);
      setTimeout(() => {
        epochRcvr = client.createReceiver(partitionId, { epoch: 1, eventPosition: EventPosition.fromEnd() });
        const onerr4 = (error) => {
          debug(">>>> epoch Receiver ", error);
          throw new Error("OnErr4 >> An Error should not have happened for epoch receiver with epoch value 1.");
        };
        const onmsg4 = (data) => {
          debug(">>>> epoch Receiver ", data);
        };
        epochRcvr.start(onmsg4, onerr4);
        debug("Created epoch receiver %s", epochRcvr.name);
      }, 3000);
    });
  });

  describe("Negative scenarios", function () {

    describe("on invalid partition ids like", function () {
      const invalidIds = ["XYZ", "-1", "1000", "-", " "];
      invalidIds.forEach(function (id) {
        it(`"${id}" should throw an error`, async function () {
          try {
            receiver = client.createReceiver(id);
            debug("Created receiver and will be receiving messages from partition id ...", id);
            const d = await receiver.receive(10, 3);
            debug("received messages ", d.length);
          } catch (err) {
            debug("Receiver %s received an error", receiver.name, err);
            should.exist(err);
            should.equal(true, err.name === "ArgumentOutOfRangeError" || err.name === "InvalidOperationError");
          }
        });
      });

      const invalidIds2 = ["", null];
      invalidIds2.forEach(function (id) {
        it(`"${id}" should throw an error`, async function () {
          try {
            receiver = client.createReceiver(id);
          } catch (err) {
            debug(`>>>> Received error - `, err);
            should.exist(err);
          }
        });
      });
    });

    it("should throw 'MessagingEntityNotFoundError' if a message is received after the receiver is closed.", async function () {
      receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnd() });
      receiver.should.be.instanceof(EventHubReceiver);
      await receiver.receive(10, 3);
      await receiver.close();
      debug("closed receiver.");
      try {
        await receiver.receive(10, 3);
      } catch (err) {
        should.exist(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw 'InvalidOperationError' if the receiver has already started receiving messages and someone calls start again.", function (done) {
      receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnd() });
      receiver.should.be.instanceof(EventHubReceiver);
      const onErr = (err) => {
        debug("An error occurred while receiving messages from the EventHub.");
        throw err;
      };
      const onMsg = (data) => {
      };
      receiver.start(onMsg, onErr);
      try {
        receiver.start(onMsg, onErr);
      } catch (err) {
        // debug(">>>> Eexpected error: ", err);
        should.exist(err);
        should.equal(err.name, "InvalidOperationError");
        done();
      }
    });

    it("should throw 'InvalidOperationError' if receiver.receive() is called after receiver.start().", async function () {
      receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnd() });
      receiver.should.be.instanceof(EventHubReceiver);
      const onErr = (err) => {
        debug("An error occurred while receiving messages from the EventHub.");
        throw err;
      };
      const onMsg = (data) => {
      };
      receiver.start(onMsg, onErr);
      try {
        await receiver.receive(10, 3);
      } catch (err) {
        // debug(">>>> Eexpected error: ", err);
        should.exist(err);
        should.equal(err.name, "InvalidOperationError");
      }
    });

    it("should throw 'InvalidOperationError' if receiver.start() is called while receiver.receive() is executing.", async function () {
      receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnd() });
      receiver.should.be.instanceof(EventHubReceiver);
      const onErr = (err) => {
        debug("An error occurred while receiving messages from the EventHub.");
        throw err;
      };
      const onMsg = (data) => {
      };
      try {
        receiver.receive(10, 3);
        receiver.start(onMsg, onErr);
      } catch (err) {
        debug(">>>> Eexpected error: ", err);
        should.exist(err);
        should.equal(err.name, "InvalidOperationError");
      }
    });

    it("should throw 'InvalidOperationError' if receiver.receive() is called while previous receiver.receive() is executing.", async function () {
      receiver = client.createReceiver("0", { eventPosition: EventPosition.fromEnd() });
      receiver.should.be.instanceof(EventHubReceiver);
      const onErr = (err) => {
        debug("An error occurred while receiving messages from the EventHub.");
        throw err;
      };
      const onMsg = (data) => {
      };
      try {
        receiver.receive(10, 3);
        receiver.receive(5, 5);
      } catch (err) {
        debug(">>>> Eexpected error: ", err);
        should.exist(err);
        should.equal(err.name, "InvalidOperationError");
      }
    });

    it("should receive 'QuotaExceededError' when attempting to connect more than 5 receivers to a partition in a consumer group", function (done) {
      const partitionId = hubInfo.partitionIds[0];
      let rcvrs: EventHubReceiver[] = [];
      for (let i = 1; i <= 5; i++) {
        rcvrs.push(client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: `rcvr-${i}` }));
      }
      debug(">>> Receivers length: ", rcvrs.length);
      for (const rcvr of rcvrs) {
        debug("[%s], %s", rcvr.identifier, rcvr.name);
        const onMsg = (data) => {
          //debug("receiver %s, %o", rcvr.identifier!, data);
        };
        const onError = (err) => {
          debug("@@@@ Error received by receiver %s", rcvr.identifier!);
          debug(err);
        };
        rcvr.start(onMsg, onError);
      }
      debug(">>> Attached message handlers to each receiver.");
      setTimeout(() => {
        const failedRcvr = client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-6" });
        debug(`Created 6th receiver - ${failedRcvr.name}`);
        const onmsg2 = (data) => {
          //debug(data);
        };
        const onerr2 = (err) => {
          debug("@@@@ Error received by receiver %s", failedRcvr.identifier!);
          debug(err);
          should.equal(err.name, "QuotaExceededError");
          let promises = [];
          for (const rcvr of rcvrs) {
            promises.push(rcvr.close());
          }
          Promise.all(promises).then(() => {
            debug("Successfully closed all the receivers..");
            done();
          }).catch((err) => {
            debug("An error occurred while closing the receiver in the 'QuotaExceededError' test.", err);
            done();
          });
        }
        failedRcvr.start(onmsg2, onerr2);
        rcvrs.push(failedRcvr);
      }, 5000);
    });
  });
});