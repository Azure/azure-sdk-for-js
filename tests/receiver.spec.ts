// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
import * as uuid from "uuid/v4";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:receiver-spec");
import { EventPosition, EventHubClient, EventHubReceiver, EventData, Errors, EventHubRuntimeInformation, EventHubSender } from "../lib";

describe("EventHub Receiver", function () {
  this.timeout(120000);
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
      sender = await client.createSender(partitionId);
      for (let i = 0; i < 10; i++) {
        const ed: EventData = {
          body: "Hello awesome world " + i
        }
        await sender.send(ed);
        debug("sent message - " + i);
      }
      debug("Creating new receiver with offset EndOfStream");
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnd() });
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
      const datas = await receiver.receive(10, 5);
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
      sender = await client.createSender(partitionId);
      debug(`Creating new receiver with last enqueued offset: "${pInfo.lastEnqueuedOffset}".`);
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromOffset(pInfo.lastEnqueuedOffset) });
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
      sender = await client.createSender(partitionId);
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
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromOffset(pInfo.lastEnqueuedOffset, true) });
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
      sender = await client.createSender(partitionId);
      debug(`Creating new receiver with last enqueued time: "${pInfo.lastEnqueuedTimeUtc}".`);
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnqueuedTime(pInfo.lastEnqueuedTimeUtc) });
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
      sender = await client.createSender(partitionId);
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
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromSequenceNumber(pInfo.lastSequenceNumber) });
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
      sender = await client.createSender(partitionId);
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
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromSequenceNumber(pInfo.lastSequenceNumber, true) });
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
      receiver = await client.createReceiver(partitionId);
      const datas = await receiver.receive(5, 10);
      debug("received messages: ", datas);
      datas.length.should.equal(5);
    });
  });

  describe("with receiverRuntimeMetricEnabled", function () {
    it("should have ReceiverRuntimeInfo populated", async function () {
      const partitionId = hubInfo.partitionIds[0];
      sender = await client.createSender(partitionId);
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
      receiver = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), enableReceiverRuntimeMetric: true });
      let datas = await receiver.receive(1, 10);
      debug("receiver.runtimeInfo ", receiver.runtimeInfo);
      datas.length.should.equal(1);
      should.exist(receiver.runtimeInfo);
      receiver.runtimeInfo!.lastEnqueuedOffset!.should.equal(pInfo.lastEnqueuedOffset);
      receiver.runtimeInfo!.lastSequenceNumber!.should.equal(pInfo.lastSequenceNumber);
      receiver.runtimeInfo!.lastEnqueuedTimeUtc!.getTime().should.equal(pInfo.lastEnqueuedTimeUtc.getTime());
      receiver.runtimeInfo!.paritionId!.should.equal(pInfo.partitionId);
      receiver.runtimeInfo!.retrievalTime!.getTime().should.be.greaterThan(Date.now() - 60000);
    });
  });

  describe("with epoch", function () {
    it("should behave correctly when 2 epoch receivers with different values are connecting to a partition in a consumer group", async function () {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr1: EventHubReceiver, epochRcvr2: EventHubReceiver;
      try {
        let events: EventData[] = [];
        epochRcvr1 = await client.createReceiver(partitionId, { epoch: 1, eventPosition: EventPosition.fromEnd() });
        epochRcvr1.on("error", (error) => {
          //debug(">>>> epoch Receiver 1", error);
          should.exist(error);
          should.equal(error.name, "ReceiverDisconnectedError");
        });
        debug("Created epoch receiver 1 %s", epochRcvr1.name);
        events = await epochRcvr1.receive(20, 10);
        debug("Received events from epoch receiver 1 %s - %o", epochRcvr1.name, events.length);
        epochRcvr2 = await client.createReceiver(partitionId, { epoch: 2, eventPosition: EventPosition.fromEnd() });
        debug("Created epoch receiver 2 %s", epochRcvr2.name);
        epochRcvr2.on("error", (error) => {
          debug(">>>> epoch Receiver 2", error);
          throw new Error("An Error should not have happened for epoch receiver with epoch value 2.");
        });
        events = await epochRcvr2.receive(20, 10);
        debug(">>>> Received events from epoch receiver 2 %s - %o", epochRcvr2.name, events.length);
      } catch (err) {
        debug("uber catch: ", err);
      } finally {
        await epochRcvr1.close();
        await epochRcvr2.close();
        debug("Successfully closed the epoch receiver with value 1 and 2.");
      }
    });

    it("should behave correctly when a non epoch receiver is created after an epoch receiver", async function () {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr: EventHubReceiver, nonEpochRcvr: EventHubReceiver;
      try {
        let events: EventData[] = [];
        epochRcvr = await client.createReceiver(partitionId, { epoch: 1, eventPosition: EventPosition.fromEnd() });
        epochRcvr.on("error", (error) => {
          debug(">>>> epoch Receiver 1", error);
          throw new Error("An Error should not have happened for epoch receiver with epoch value 1.");
        });
        debug("Created epoch receiver 1 %s", epochRcvr.name);
        events = await epochRcvr.receive(20, 10);
        debug("Received events from epoch receiver 1 %s - %o", epochRcvr.name, events.length);
        nonEpochRcvr = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnd() });
        nonEpochRcvr.on("error", (error) => {
          debug(">>>> non epoch Receiver", error);
          should.exist(error);
          should.equal(error.name, "ReceiverDisconnectedError");
        });
        debug("Created non epoch receiver %s", nonEpochRcvr.name);
        events = await nonEpochRcvr.receive(20, 10);
        debug(">>>> Received events from non epoch receiver 2 %s - %o", epochRcvr.name, events.length);
      } catch (err) {
        debug(err);
      } finally {
        await nonEpochRcvr.close();
        await epochRcvr.close();
        debug("Successfully closed the nonEpoch and epoch receivers");
      }
    });

    it("should behave correctly when an epoch receiver is created after a non epoch receiver", async function () {
      const partitionId = hubInfo.partitionIds[0];
      let epochRcvr: EventHubReceiver, nonEpochRcvr: EventHubReceiver;
      try {
        let events: EventData[] = [];
        nonEpochRcvr = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromEnd() });
        nonEpochRcvr.on("error", (error) => {
          debug(">>>> non epoch Receiver: ", error);
          should.exist(error);
          should.equal(error.name, "ReceiverDisconnectedError");
        });
        debug("Created non epoch receiver %s", nonEpochRcvr.name);
        events = await nonEpochRcvr.receive(20, 10);
        debug(">>>> Received events from non epoch receiver %s - %o", nonEpochRcvr.name, events.length);
        epochRcvr = await client.createReceiver(partitionId, { epoch: 1, eventPosition: EventPosition.fromEnd() });
        epochRcvr.on("error", (error) => {
          debug(">>>> epoch Receiver: ", error);
          throw new Error("An Error should not have happened for epoch receiver with epoch value 1.");
        });
        debug("Created epoch receiver %s", epochRcvr.name);
        events = await epochRcvr.receive(20, 10);
        debug("Received events from epoch receiver 1 %s - %o", epochRcvr.name, events.length);
      } catch (err) {
        debug(err);
      } finally {
        await nonEpochRcvr.close();
        await epochRcvr.close();
        debug("Successfully closed the nonEpoch and epoch receivers");
      }
    });
  });

  describe("Negative scenarios", function () {

    describe("on invalid partition ids like", function () {
      const invalidIds = ["XYZ", "-1", "1000", "-", " "];
      invalidIds.forEach(function (id) {
        it(`"${id}" should throw an error`, async function () {
          try {
            receiver = await client.createReceiver(id);
            receiver.on("error", (error) => {
              debug("Receiver %s received an error", receiver.name, error);
              should.exist(error);
              should.equal(true, error.name === "ArgumentOutOfRangeError" || error.name === "InvalidOperationError");
            });
            debug("Created receiver and will be receiving messages from partition id ...", id);
            const d = await receiver.receive(10, 3);
            debug("received messages ", d.length);
          } catch (err) {
            debug(`>>>> This should not have happened. Received error - `, err);
            throw err;
          }
        });
      });

      const invalidIds2 = ["", null];
      invalidIds2.forEach(function (id) {
        it(`"${id}" should throw an error`, async function () {
          try {
            receiver = await client.createReceiver(id);
          } catch (err) {
            debug(`>>>> Received error - `, err);
            should.exist(err);
          }
        });
      });
    });

    it("should throw 'MessagingEntityNotFoundError' if a message is received after the receiver is closed.", async function () {
      receiver = await client.createReceiver("0");
      receiver.should.be.instanceof(EventHubReceiver);
      await receiver.close();
      debug("closed receiver.");
      try {
        await receiver.receive(10, 3);
      } catch (err) {
        should.exist(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should receive 'QuotaExceededError' when attempting to connect more than 5 receivers to a partition in a consumer group", async function () {
      const partitionId = hubInfo.partitionIds[0];
      let rcvrs: EventHubReceiver[] = [];
      try {
        rcvrs = await Promise.all([
          client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-1" }),
          client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-2" }),
          client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-3" }),
          client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-4" }),
          client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-5" })
        ]);
        debug(">>> Receivers length: ", rcvrs.length);
        for (const rcvr of rcvrs) {
          debug("[%s], %s", rcvr.identifier, rcvr.name);
          rcvr.on("message", (data) => {
            //debug("receiver %s, %o", rcvr.identifier!, data);
          });
          rcvr.on("receiver_error", (context) => {
            debug("@@@@ Error received by receiver %s", rcvr.identifier!);
            debug(context);
          });
        }
        debug(">>> Attached message handlers to each receiver.")
        try {
          const failedRcvr = await client.createReceiver(partitionId, { eventPosition: EventPosition.fromStart(), identifier: "rcvr-6" });
          debug(`Created 6th receiver - ${failedRcvr.name}`);
          failedRcvr.on("message", (data) => {
            //debug(data);
          });
          failedRcvr.on("receiver_error", (context) => {
            debug("@@@@ Error received by receiver %s", failedRcvr.identifier!);
            debug(context);
          });
          rcvrs.push(failedRcvr);
        } catch (err) {
          rcvrs.length.should.equal(5);
          should.equal(err.name, "QuotaExceededError");
        }
      } catch (err) {
        debug("uber catch: ", err);
        throw new Error("Should not have reached here.");
      } finally {
        for (const rcvr of rcvrs) {
          try {
            await rcvr.close();
          } catch (err) {
            debug("An error occurred while closing the receiver in the 'QuotaExceededError' test.", err);
          }
        }
      }
    });
  });
});