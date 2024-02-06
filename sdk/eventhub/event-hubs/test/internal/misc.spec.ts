// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventHubProperties,
  ReceivedEventData,
  Subscription,
} from "../../src";
import {
  TRACEPARENT_PROPERTY,
  extractSpanContextFromEventData,
} from "../../src/diagnostics/instrumentEventData";
import { SubscriptionHandlerForTests } from "../public/utils/subscriptionHandlerForTests";
import chai, { assert } from "chai";
import chaiAsPromised from "chai-as-promised";
import { createMockServer } from "../public/utils/mockService";
import debugModule from "debug";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";
import { tracingClient } from "../../src/diagnostics/tracing";
import Sinon from "sinon";
import { getRandomName } from "../../src/util/utils";

const should = chai.should();
chai.use(chaiAsPromised);
const debug = debugModule("azure:event-hubs:misc-spec");

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }

  describe("Misc tests", function (): void {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME],
    };
    let consumerClient: EventHubConsumerClient;
    let producerClient: EventHubProducerClient;
    let hubInfo: EventHubProperties;
    let partitionId: string;
    let lastEnqueuedOffset: number;

    before("validate environment", async function (): Promise<void> {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    beforeEach(async () => {
      debug("Creating the clients..");
      producerClient = new EventHubProducerClient(service.connectionString, service.path);
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
      hubInfo = await consumerClient.getEventHubProperties();
      partitionId = hubInfo.partitionIds[0];
      lastEnqueuedOffset = (await consumerClient.getPartitionProperties(partitionId))
        .lastEnqueuedOffset;
    });

    afterEach(async () => {
      debug("Closing the clients..");
      await producerClient.close();
      await consumerClient.close();
    });

    it("should be able to send and receive a large message correctly", async function (): Promise<void> {
      const bodysize = 220 * 1024;
      const msgString = "A".repeat(220 * 1024);
      const msgBody = Buffer.from(msgString);
      const obj: EventData = { body: msgBody };
      debug(`Partition ${partitionId} has last message with offset ${lastEnqueuedOffset}.`);
      debug("Sending one message with %d bytes.", bodysize);
      await producerClient.sendBatch([obj], { partitionId });
      debug("Successfully sent the large message.");

      let subscription: Subscription | undefined;
      await new Promise<void>((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              debug("received message: ", data.length);
              should.exist(data);
              should.equal(data.length, 1);
              should.equal(data[0].body.toString(), msgString);
              should.not.exist((data[0].properties || {}).message_id);
              resolve();
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: { offset: lastEnqueuedOffset },
          }
        );
      });
      await subscription!.close();
    });

    it("should be able to send and receive a JSON object as a message correctly", async function (): Promise<void> {
      const msgBody = {
        id: "123-456-789",
        weight: 10,
        isBlue: true,
        siblings: [
          {
            id: "098-789-564",
            weight: 20,
            isBlue: false,
          },
        ],
      };
      const obj: EventData = { body: msgBody };
      debug(`Partition ${partitionId} has last message with offset ${lastEnqueuedOffset}.`);
      debug("Sending one message %O", obj);
      await producerClient.sendBatch([obj], { partitionId });
      debug("Successfully sent the large message.");

      let subscription: Subscription | undefined;
      await new Promise<void>((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              debug("received message: ", data.length);
              should.exist(data);
              should.equal(data.length, 1);
              assert.deepEqual(data[0].body, msgBody);
              should.not.exist((data[0].properties || {}).message_id);
              resolve();
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: { offset: lastEnqueuedOffset },
          }
        );
      });
      await subscription!.close();
    });

    it("should be able to send and receive an array as a message correctly", async function (): Promise<void> {
      const msgBody = [
        {
          id: "098-789-564",
          weight: 20,
          isBlue: false,
        },
        10,
        20,
        "some string",
      ];
      const obj: EventData = { body: msgBody, properties: { message_id: getRandomName() } };
      debug(`Partition ${partitionId} has last message with offset ${lastEnqueuedOffset}.`);
      debug("Sending one message %O", obj);
      await producerClient.sendBatch([obj], { partitionId });
      debug("Successfully sent the large message.");

      let subscription: Subscription | undefined;
      await new Promise<void>((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              debug("received message: ", data.length);
              should.exist(data);
              should.equal(data.length, 1);
              assert.deepEqual(data[0].body, msgBody);
              assert.strictEqual(data[0].properties!.message_id, obj.properties!.message_id);
              resolve();
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: { offset: lastEnqueuedOffset },
          }
        );
      });
      await subscription!.close();
    });

    it("should be able to send a boolean as a message correctly", async function (): Promise<void> {
      const msgBody = true;
      const obj: EventData = { body: msgBody };
      debug(`Partition ${partitionId} has last message with offset ${lastEnqueuedOffset}.`);
      debug("Sending one message %O", obj);
      await producerClient.sendBatch([obj], { partitionId });
      debug("Successfully sent the large message.");

      let subscription: Subscription | undefined;
      await new Promise<void>((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              debug("received message: ", data.length);
              should.exist(data);
              should.equal(data.length, 1);
              assert.deepEqual(data[0].body, msgBody);
              should.not.exist((data[0].properties || {}).message_id);
              resolve();
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: { offset: lastEnqueuedOffset },
          }
        );
      });
      await subscription!.close();
    });

    it("should be able to send and receive batched messages correctly ", async function (): Promise<void> {
      debug(`Partition ${partitionId} has last message with offset ${lastEnqueuedOffset}.`);
      const messageCount = 5;
      const d: EventData[] = [];
      for (let i = 0; i < messageCount; i++) {
        const obj: EventData = { body: `Hello EH ${i}` };
        d.push(obj);
      }

      await producerClient.sendBatch(d, { partitionId });
      debug("Successfully sent 5 messages batched together.");

      let subscription: Subscription | undefined;
      const receivedMsgs: ReceivedEventData[] = [];
      await new Promise<void>((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              debug("received message: ", data.length);
              receivedMsgs.push(...data);
              if (receivedMsgs.length === 5) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: { offset: lastEnqueuedOffset },
          }
        );
      });
      await subscription!.close();
      receivedMsgs.length.should.equal(5);
      for (const message of receivedMsgs) {
        should.not.exist((message.properties || {}).message_id);
      }
    });

    it("should be able to send and receive batched messages as JSON objects correctly ", async function (): Promise<void> {
      debug(`Partition ${partitionId} has last message with offset ${lastEnqueuedOffset}.`);
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
                isBlue: false,
              },
            ],
          },
          properties: {
            message_id: getRandomName(),
          },
        };
        d.push(obj);
      }

      await producerClient.sendBatch(d, { partitionId });
      debug("Successfully sent 5 messages batched together.");

      let subscription: Subscription | undefined;
      const receivedMsgs: ReceivedEventData[] = [];
      await new Promise<void>((resolve, reject) => {
        subscription = consumerClient.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              debug("received message: ", data.length);
              receivedMsgs.push(...data);
              if (receivedMsgs.length === 5) {
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: { offset: lastEnqueuedOffset },
          }
        );
      });
      await subscription!.close();
      should.equal(receivedMsgs[0].body.count, 0);
      should.equal(receivedMsgs.length, 5);
      for (const [index, message] of receivedMsgs.entries()) {
        assert.strictEqual(message.properties!.message_id, d[index].properties!.message_id);
      }
    });

    it("should consistently send messages with partitionkey to a partitionId", async function (): Promise<void> {
      const { subscriptionEventHandler, startPosition } =
        await SubscriptionHandlerForTests.startingFromHere(consumerClient);

      const msgToSendCount = 50;
      debug("Sending %d messages.", msgToSendCount);

      function getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
      }

      const senderPromises = [];

      for (let i = 0; i < msgToSendCount; i++) {
        const partitionKey = getRandomInt(10);
        senderPromises.push(
          producerClient.sendBatch([{ body: "Hello EventHub " + i }], {
            partitionKey: partitionKey.toString(),
          })
        );
      }

      await Promise.all(senderPromises);

      debug("Starting to receive all messages from each partition.");
      const partitionMap: any = {};

      let subscription: Subscription | undefined = undefined;

      try {
        subscription = consumerClient.subscribe(subscriptionEventHandler, {
          startPosition,
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
  }).timeout(60000);

  describe("extractSpanContextFromEventData", function () {
    it("should use diagnostic Id from a properly instrumented EventData", function () {
      const tracingClientSpy = Sinon.spy(tracingClient, "parseTraceparentHeader");
      const traceparent = `00-11111111111111111111111111111111-2222222222222222-00`;
      const eventData: ReceivedEventData = {
        body: "This is a test.",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        sequenceNumber: 0,
        partitionKey: null,
        properties: {
          [TRACEPARENT_PROPERTY]: traceparent,
        },
        getRawAmqpMessage() {
          return {} as any;
        },
      };
      extractSpanContextFromEventData(eventData);
      assert.isTrue(tracingClientSpy.calledWith(traceparent));
    });

    it("should return undefined when EventData is not instrumented", function () {
      const eventData: ReceivedEventData = {
        body: "This is a test.",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        sequenceNumber: 0,
        partitionKey: null,
        getRawAmqpMessage() {
          return {} as any;
        },
      };

      const spanContext = extractSpanContextFromEventData(eventData);

      should.not.exist(
        spanContext,
        `Missing property "${TRACEPARENT_PROPERTY}" should return undefined spanContext.`
      );
    });
  });
});
