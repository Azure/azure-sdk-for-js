// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import chai from "chai";
import assert from "assert";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:misc-spec");
import { EventPosition, EventHubClient, EventData, EventHubProperties } from "../src";
import { BatchingReceiver } from "../src/batchingReceiver";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

describe("Misc tests #RunnableInBrowser", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
  let breceiver: BatchingReceiver;
  let hubInfo: EventHubProperties;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
    hubInfo = await client.getProperties();
  });

  after("close the connection", async function(): Promise<void> {
    await client.close();
  });

  it("should be able to send and receive a large message correctly", async function(): Promise<void> {
    const bodysize = 220 * 1024;
    const partitionId = hubInfo.partitionIds[0];
    const msgString = "A".repeat(220 * 1024);
    const msgBody = Buffer.from(msgString);
    const obj: EventData = { body: msgBody };
    const offset = (await client.getPartitionInformation(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message with %d bytes.", bodysize);
    breceiver = BatchingReceiver.create(
      (client as any)._context,
      EventHubClient.defaultConsumerGroup,
      partitionId,
      EventPosition.fromOffset(offset)
    );
    let data = await breceiver.receive(5, 10);
    should.equal(data.length, 0, "Unexpected to receive message before client sends it");
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    data = await breceiver.receive(5, 30);
    debug("Closing the receiver..");
    await breceiver.close();
    debug("received message: ", data.length);
    should.exist(data);
    should.equal(data.length, 1);
    should.equal(data[0].body.toString(), msgString);
    should.not.exist((data[0].properties || {}).message_id);
  });

  it("should be able to send and receive a JSON object as a message correctly", async function(): Promise<void> {
    const partitionId = hubInfo.partitionIds[0];
    const msgBody = {
      id: "123-456-789",
      weight: 10,
      isBlue: true,
      siblings: [
        {
          id: "098-789-564",
          weight: 20,
          isBlue: false
        }
      ]
    };
    const obj: EventData = { body: msgBody };
    const offset = (await client.getPartitionInformation(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message %O", obj);
    breceiver = BatchingReceiver.create(
      (client as any)._context,
      EventHubClient.defaultConsumerGroup,
      partitionId,
      EventPosition.fromOffset(offset)
    );
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    const data = await breceiver.receive(5, 30);
    await breceiver.close();
    debug("received message: ", data);
    should.exist(data);
    should.equal(data.length, 1);
    debug("Received message: %O", data);
    assert.deepEqual(data[0].body, msgBody);
    should.not.exist((data[0].properties || {}).message_id);
  });

  it("should be able to send and receive an array as a message correctly", async function(): Promise<void> {
    const partitionId = hubInfo.partitionIds[0];
    const msgBody = [
      {
        id: "098-789-564",
        weight: 20,
        isBlue: false
      },
      10,
      20,
      "some string"
    ];
    const obj: EventData = { body: msgBody, properties: { message_id: uuid() } };
    const offset = (await client.getPartitionInformation(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message %O", obj);
    breceiver = BatchingReceiver.create(
      (client as any)._context,
      EventHubClient.defaultConsumerGroup,
      partitionId,
      EventPosition.fromOffset(offset)
    );
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    const data = await breceiver.receive(5, 30);
    await breceiver.close();
    debug("received message: ", data);
    should.exist(data);
    should.equal(data.length, 1);
    debug("Received message: %O", data);
    assert.deepEqual(data[0].body, msgBody);
    assert.strictEqual(data[0].properties!.message_id, obj.properties!.message_id);
  });

  it("should be able to send a boolean as a message correctly", async function(): Promise<void> {
    const partitionId = hubInfo.partitionIds[0];
    const msgBody = true;
    const obj: EventData = { body: msgBody };
    const offset = (await client.getPartitionInformation(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message %O", obj);
    breceiver = BatchingReceiver.create(
      (client as any)._context,
      EventHubClient.defaultConsumerGroup,
      partitionId,
      EventPosition.fromOffset(offset)
    );
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    const data = await breceiver.receive(5, 30);
    await breceiver.close();
    debug("received message: ", data);
    should.exist(data);
    should.equal(data.length, 1);
    debug("Received message: %O", data);
    assert.deepEqual(data[0].body, msgBody);
    should.not.exist((data[0].properties || {}).message_id);
  });

  it("should be able to send and receive batched messages correctly ", async function(): Promise<void> {
    try {
      const partitionId = hubInfo.partitionIds[0];
      const offset = (await client.getPartitionInformation(partitionId)).lastEnqueuedOffset;
      debug(`Partition ${partitionId} has last message with offset ${offset}.`);
      const messageCount = 5;
      const d: EventData[] = [];
      for (let i = 0; i < messageCount; i++) {
        const obj: EventData = { body: `Hello EH ${i}` };
        d.push(obj);
      }

      const sender = client.createProducer({ partitionId });
      await sender.send(d, { partitionKey: "pk1234656" });
      debug("Successfully sent 5 messages batched together.");

      const receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroup,
        partitionId,
        EventPosition.fromOffset(offset)
      );
      const data = await receiver.receiveBatch(5, 30);
      await receiver.close();
      debug("received message: ", data);
      should.exist(data);
      data.length.should.equal(5);
      for (const message of data) {
        should.not.exist((message.properties || {}).message_id);
      }
    } catch (err) {
      debug("should not have happened, uber catch....", err);
      throw err;
    }
  });

  it("should be able to send and receive batched messages as JSON objects correctly ", async function(): Promise<void> {
    try {
      const partitionId = hubInfo.partitionIds[0];
      const offset = (await client.getPartitionInformation(partitionId)).lastEnqueuedOffset;
      debug(`Partition ${partitionId} has last message with offset ${offset}.`);
      const messageCount = 5;
      const d: EventData[] = [];
      for (let i = 0; i < messageCount; i++) {
        const obj: EventData = {
          body: {
            id: "123-456-789",
            count: i,
            weight: 10,
            isBlue: true,
            siblings: [
              {
                id: "098-789-564",
                weight: 20,
                isBlue: false
              }
            ]
          },
          properties: {
            message_id: uuid()
          }
        };
        d.push(obj);
      }

      const sender = client.createProducer({ partitionId });
      await sender.send(d, { partitionKey: "pk1234656" });
      debug("Successfully sent 5 messages batched together.");

      const receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroup,
        partitionId,
        EventPosition.fromOffset(offset)
      );
      const data = await receiver.receiveBatch(5, 30);
      await receiver.close();
      debug("received message: ", data);
      should.exist(data);
      should.equal(data[0].body.count, 0);
      should.equal(data.length, 5);
      for (const [index, message] of data.entries()) {
        assert.strictEqual(message.properties!.message_id, d[index].properties!.message_id);
      }
    } catch (err) {
      debug("should not have happened, uber catch....", err);
      throw err;
    }
  });

  it("should consistently send messages with partitionkey to a partitionId", async function(): Promise<void> {
    const msgToSendCount = 50;
    const partitionOffsets: any = {};
    debug("Discovering end of stream on each partition.");
    const partitionIds = hubInfo.partitionIds;
    for (const id of partitionIds) {
      const pInfo = await client.getPartitionInformation(id);
      partitionOffsets[id] = pInfo.lastEnqueuedOffset;
      debug(`Partition ${id} has last message with offset ${pInfo.lastEnqueuedOffset}.`);
    }
    debug("Sending %d messages.", msgToSendCount);
    function getRandomInt(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
    }
    for (let i = 0; i < msgToSendCount; i++) {
      const partitionKey = getRandomInt(10);
      const sender = client.createProducer();
      await sender.send([{ body: "Hello EventHub " + i }], { partitionKey: partitionKey.toString() });
    }
    debug("Starting to receive all messages from each partition.");
    const partitionMap: any = {};
    let totalReceived = 0;
    for (const id of partitionIds) {
      const receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroup,
        id,
        EventPosition.fromOffset(partitionOffsets[id])
      );
      const data = await receiver.receiveBatch(50, 10);
      await receiver.close();
      debug(`Received ${data.length} messages from partition ${id}.`);
      for (const d of data) {
        debug(">>>> _raw_amqp_mesage: ", (d as any)._raw_amqp_mesage);
        const pk = d.partitionKey as string;
        debug("pk: ", pk);
        if (partitionMap[pk] && partitionMap[pk] !== id) {
          debug(
            `#### Error: Received a message from partition ${id} with partition key ${pk}, whereas the same key was observed on partition ${partitionMap[pk]} before.`
          );
          assert(partitionMap[pk] === id);
        }
        partitionMap[pk] = id;
        debug("partitionMap ", partitionMap);
      }
      totalReceived += data.length;
    }
    should.equal(totalReceived, msgToSendCount);
  });
}).timeout(60000);
