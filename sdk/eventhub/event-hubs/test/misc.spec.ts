// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuid } from "uuid";
import chai from "chai";
import assert from "assert";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:misc-spec");
import {
  EventData,
  EventHubProperties,
  ReceivedEventData,
  EventHubConsumerClient,
  Subscription
} from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import {
  TRACEPARENT_PROPERTY,
  extractSpanContextFromEventData
} from "../src/diagnostics/instrumentEventData";
import { TraceFlags } from "@opentelemetry/api";
import { EventHubConsumer } from "../src/receiver";
import { SubscriptionHandlerForTests } from "./utils/subscriptionHandlerForTests";
const env = getEnvVars();

describe("Misc tests", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
  let receiver: EventHubConsumer;
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

  it("should be able to send and receive a large message correctly", async function(): Promise<
    void
  > {
    const bodysize = 220 * 1024;
    const partitionId = hubInfo.partitionIds[0];
    const msgString = "A".repeat(220 * 1024);
    const msgBody = Buffer.from(msgString);
    const obj: EventData = { body: msgBody };
    const offset = (await client.getPartitionProperties(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message with %d bytes.", bodysize);
    receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, {
      offset
    });
    let data = await receiver.receiveBatch(1, 1);
    should.equal(data.length, 0, "Unexpected to receive message before client sends it");
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    data = await receiver.receiveBatch(1, 30);
    debug("Closing the receiver..");
    await receiver.close();
    debug("received message: ", data.length);
    should.exist(data);
    should.equal(data.length, 1);
    should.equal(data[0].body.toString(), msgString);
    should.not.exist((data[0].properties || {}).message_id);
  });

  it("should be able to send and receive a JSON object as a message correctly", async function(): Promise<
    void
  > {
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
    const offset = (await client.getPartitionProperties(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message %O", obj);
    receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, {
      offset
    });
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    const data = await receiver.receiveBatch(1, 30);
    await receiver.close();
    debug("received message: ", data);
    should.exist(data);
    should.equal(data.length, 1);
    debug("Received message: %O", data);
    assert.deepEqual(data[0].body, msgBody);
    should.not.exist((data[0].properties || {}).message_id);
  });

  it("should be able to send and receive an array as a message correctly", async function(): Promise<
    void
  > {
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
    const offset = (await client.getPartitionProperties(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message %O", obj);
    receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, {
      offset
    });
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    const data = await receiver.receiveBatch(1, 30);
    await receiver.close();
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
    const offset = (await client.getPartitionProperties(partitionId)).lastEnqueuedOffset;
    debug(`Partition ${partitionId} has last message with offset ${offset}.`);
    debug("Sending one message %O", obj);
    receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, {
      offset
    });
    const sender = client.createProducer({ partitionId });
    await sender.send([obj]);
    debug("Successfully sent the large message.");
    const data = await receiver.receiveBatch(1, 30);
    await receiver.close();
    debug("received message: ", data);
    should.exist(data);
    should.equal(data.length, 1);
    debug("Received message: %O", data);
    assert.deepEqual(data[0].body, msgBody);
    should.not.exist((data[0].properties || {}).message_id);
  });

  it("should be able to send and receive batched messages correctly ", async function(): Promise<
    void
  > {
    try {
      const partitionId = hubInfo.partitionIds[0];
      const offset = (await client.getPartitionProperties(partitionId)).lastEnqueuedOffset;
      debug(`Partition ${partitionId} has last message with offset ${offset}.`);
      const messageCount = 5;
      const d: EventData[] = [];
      for (let i = 0; i < messageCount; i++) {
        const obj: EventData = { body: `Hello EH ${i}` };
        d.push(obj);
      }

      const sender = client.createProducer({ partitionId });
      await sender.send(d);
      debug("Successfully sent 5 messages batched together.");

      const receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, {
        offset
      });
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

  it("should be able to send and receive batched messages as JSON objects correctly ", async function(): Promise<
    void
  > {
    try {
      const partitionId = hubInfo.partitionIds[0];
      const offset = (await client.getPartitionProperties(partitionId)).lastEnqueuedOffset;
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
      await sender.send(d);
      debug("Successfully sent 5 messages batched together.");

      const receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, partitionId, {
        offset
      });
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

  it("should consistently send messages with partitionkey to a partitionId", async function(): Promise<
    void
  > {
    const consumerClient = new EventHubConsumerClient(
      EventHubClient.defaultConsumerGroupName,
      service.connectionString!,
      service.path
    );

    const {
      subscriptionEventHandler,
      startPosition
    } = await SubscriptionHandlerForTests.startingFromHere(consumerClient);

    const msgToSendCount = 50;
    debug("Sending %d messages.", msgToSendCount);

    function getRandomInt(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const senderPromises = [];

    for (let i = 0; i < msgToSendCount; i++) {
      const partitionKey = getRandomInt(10);
      const sender = client.createProducer();
      senderPromises.push(
        sender.send([{ body: "Hello EventHub " + i }], {
          partitionKey: partitionKey.toString()
        })
      );
    }

    await Promise.all(senderPromises);

    debug("Starting to receive all messages from each partition.");
    const partitionMap: any = {};

    let subscription: Subscription | undefined = undefined;

    try {
      subscription = consumerClient.subscribe(subscriptionEventHandler, {
        startPosition
      });
      const receivedEvents = await subscriptionEventHandler.waitForFullEvents(
        hubInfo.partitionIds,
        msgToSendCount
      );

      for (const d of receivedEvents) {
        debug(">>>> _raw_amqp_mesage: ", (d as any)._raw_amqp_mesage);
        const pk = d.event.partitionKey as string;
        debug("pk: ", pk);

        if (partitionMap[pk] && partitionMap[pk] !== d.partitionId) {
          debug(
            `#### Error: Received a message from partition ${d.partitionId} with partition key ${pk}, whereas the same key was observed on partition ${partitionMap[pk]} before.`
          );
          assert(partitionMap[pk] === d.partitionId);
        }
        partitionMap[pk] = d.partitionId;
        debug("partitionMap ", partitionMap);
      }
    } finally {
      if (subscription) {
        await subscription.close();
      }
      await consumerClient.close();
    }
  });

  describe("extractSpanContextFromEventData", function() {
    it("should extract a SpanContext from a properly instrumented EventData", function() {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      const flags = "00";
      const eventData: ReceivedEventData = {
        body: "This is a test.",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        sequenceNumber: 0,
        partitionKey: null,
        properties: {
          [TRACEPARENT_PROPERTY]: `00-${traceId}-${spanId}-${flags}`
        }
      };

      const spanContext = extractSpanContextFromEventData(eventData);

      should.exist(spanContext, "Extracted spanContext should be defined.");
      should.equal(spanContext!.traceId, traceId, "Extracted traceId does not match expectation.");
      should.equal(spanContext!.spanId, spanId, "Extracted spanId does not match expectation.");
      should.equal(
        spanContext!.traceFlags,
        TraceFlags.NONE,
        "Extracted traceFlags do not match expectations."
      );
    });

    it("should return undefined when EventData is not properly instrumented", function() {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      const flags = "00";
      const eventData: ReceivedEventData = {
        body: "This is a test.",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        sequenceNumber: 0,
        partitionKey: null,
        properties: {
          [TRACEPARENT_PROPERTY]: `99-${traceId}-${spanId}-${flags}`
        }
      };

      const spanContext = extractSpanContextFromEventData(eventData);

      should.not.exist(
        spanContext,
        "Invalid diagnosticId version should return undefined spanContext."
      );
    });

    it("should return undefined when EventData is not instrumented", function() {
      const eventData: ReceivedEventData = {
        body: "This is a test.",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        sequenceNumber: 0,
        partitionKey: null
      };

      const spanContext = extractSpanContextFromEventData(eventData);

      should.not.exist(
        spanContext,
        `Missing property "${TRACEPARENT_PROPERTY}" should return undefined spanContext.`
      );
    });
  });
}).timeout(60000);
