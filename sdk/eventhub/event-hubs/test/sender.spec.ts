// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:sender-spec");
import { EventData, EventHubProducerClient, EventHubConsumerClient } from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { SendBatchOptions } from "../src/models/public";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { TRACEPARENT_PROPERTY } from "../src/diagnostics/instrumentEventData";
import { SubscriptionHandlerForTests } from "./utils/subscriptionHandlerForTests";
import { sendMessagesToPartitionForTest, createBatchForTests } from "./utils/sendHelpers";
const env = getEnvVars();

describe("EventHub Sender #RunnableInBrowser", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
  const producerClient = new EventHubProducerClient(service.connectionString, service.path);

  before("validate environment", function(): void {
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
    debug("Closing the client..");
    await client.close();
    await producerClient.close();
  });

  describe("Single message", function(): void {
    it("should be sent successfully.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      sendMessagesToPartitionForTest("", data, producerClient);
    });

    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      sendMessagesToPartitionForTest("1", data, producerClient);
    });

    it("with partition key as a number should be sent successfully.", async function(): Promise<
      void
    > {
      const data: EventData = { body: "Hello World 1" };
      const batch = await createBatchForTests(
        {
          partitionKey: 1 as any
        },
        data,
        producerClient
      );

      await producerClient.sendBatch(batch);
    });

    it("should be sent successfully to a specific partition.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      // await client.createProducer({ partitionId: "0" }).send(data);
      sendMessagesToPartitionForTest("0", data, producerClient);
    });

    it("should support being cancelled", async function(): Promise<void> {
      try {
        const data: EventData = { body: "Sender single message Cancellation Test - timeout 0" };

        // call sendBatch once to create a connection
        const batch = await createBatchForTests({}, data, producerClient);
        producerClient.sendBatch(batch);

        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await producerClient.sendBatch(batch, { abortSignal });

        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const abortController = new AbortController();
      abortController.abort();

      try {
        const data: EventData = { body: "Sender single message Cancellation Test - immediate" };
        const batch = await createBatchForTests({}, data, producerClient);
        await producerClient.sendBatch(batch, { abortSignal: abortController.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });
  });

  describe("Batch message", function(): void {
    it("should be sent successfully.", async function(): Promise<void> {
      const data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      await sendMessagesToPartitionForTest("", data, producerClient);
    });
    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      const batch = await createBatchForTests({ partitionKey: 1 as any }, data, producerClient);
      await producerClient.sendBatch(batch);
    });
    it("should be sent successfully to a specific partition.", async function(): Promise<void> {
      const data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];

      await sendMessagesToPartitionForTest("0", data, producerClient);
    });

    it("should support being cancelled", async function(): Promise<void> {
      try {
        const data: EventData[] = [
          {
            body: "Sender Cancellation Test - timeout 0"
          }
        ];

        const batch = await createBatchForTests({}, data, producerClient);

        // call sendBatch() once to create a connection
        await producerClient.sendBatch(batch);

        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await producerClient.sendBatch(batch, { abortSignal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const abortController = new AbortController();
      abortController.abort();

      try {
        const data: EventData[] = [
          {
            body: "Sender Cancellation Test - immediate"
          }
        ];

        const batch = await createBatchForTests({ partitionId: "0" }, data, producerClient);

        await producerClient.sendBatch(batch, {
          abortSignal: abortController.signal
        });

        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });
  });

  describe("Create batch", function(): void {
    let consumerClient: EventHubConsumerClient;

    beforeEach(() => {
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
    });

    afterEach(() => {
      consumerClient.close();
    });

    it("should be sent successfully", async function(): Promise<void> {
      const list = ["Albert", `${Buffer.from("Mike".repeat(1300000))}`, "Marie"];

      const batch = await producerClient.createBatch({
        partitionId: "0"
      });

      batch.partitionId!.should.equal("0");
      should.not.exist(batch.partitionKey);
      batch.maxSizeInBytes.should.be.gt(0);

      batch.tryAdd({ body: list[0] }).should.be.ok;
      batch.tryAdd({ body: list[1] }).should.not.be.ok; //The Mike message will be rejected - it's over the limit.
      batch.tryAdd({ body: list[2] }).should.be.ok; // Marie should get added";

      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(client);

      const subscriber = consumerClient.subscribe("0", subscriptionEventHandler, {
        startPosition
      });
      await producerClient.sendBatch(batch);

      let receivedEvents;

      try {
        receivedEvents = await subscriptionEventHandler.waitForEvents(["0"], 2);
      } finally {
        await subscriber.close();
      }

      // Mike didn't make it - the message was too big for the batch
      // and was rejected above.
      [list[0], list[2]].should.be.deep.eq(
        receivedEvents.map((event) => event.body),
        "Received messages should be equal to our sent messages"
      );
    });

    it("can be manually traced", async function(): Promise<void> {
      const tracer = new TestTracer();
      setTracer(tracer);

      const rootSpan = tracer.startSpan("root");

      const list = [{ name: "Albert" }, { name: "Marie" }];

      const eventDataBatch = await producerClient.createBatch({
        partitionId: "0"
      });

      for (let i = 0; i < 2; i++) {
        eventDataBatch.tryAdd({ body: `${list[i].name}` }, { parentSpan: rootSpan });
      }
      await producerClient.sendBatch(eventDataBatch);
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(2, "Should only have two root spans.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.EventHubs.message",
                children: []
              },
              {
                name: "Azure.EventHubs.message",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.context().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
    });

    it("will not instrument already instrumented events", async function(): Promise<void> {
      const tracer = new TestTracer();
      setTracer(tracer);

      const rootSpan = tracer.startSpan("test");

      const list = [
        { name: "Albert" },
        {
          name: "Marie",
          properties: {
            [TRACEPARENT_PROPERTY]: "foo"
          }
        }
      ];

      const eventDataBatch = await producerClient.createBatch({
        partitionId: "0"
      });

      for (let i = 0; i < 2; i++) {
        eventDataBatch.tryAdd(
          { body: `${list[i].name}`, properties: list[i].properties },
          { parentSpan: rootSpan }
        );
      }
      await producerClient.sendBatch(eventDataBatch);
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(2, "Should only have two root spans.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.EventHubs.message",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.context().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
    });

    it("will support tracing batch and send", async function(): Promise<void> {
      const tracer = new TestTracer();
      setTracer(tracer);

      const rootSpan = tracer.startSpan("root");

      const list = [{ name: "Albert" }, { name: "Marie" }];

      const eventDataBatch = await producerClient.createBatch({
        partitionId: "0"
      });
      for (let i = 0; i < 2; i++) {
        eventDataBatch.tryAdd({ body: `${list[i].name}` }, { parentSpan: rootSpan });
      }
      await producerClient.sendBatch(eventDataBatch, {
        tracingOptions: {
          spanOptions: {
            parent: rootSpan
          }
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root span.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.EventHubs.message",
                children: []
              },
              {
                name: "Azure.EventHubs.message",
                children: []
              },
              {
                name: "Azure.EventHubs.send",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.context().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
    });

    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const eventDataBatch = await producerClient.createBatch({ partitionKey: "1" });
      for (let i = 0; i < 5; i++) {
        eventDataBatch.tryAdd({ body: `Hello World ${i}` });
      }
      await producerClient.sendBatch(eventDataBatch);
    });

    it("with max message size should be sent successfully.", async function(): Promise<void> {
      const partitionInfo = await client.getPartitionProperties("0");
      const consumer = client.createConsumer(EventHubClient.defaultConsumerGroupName, "0", {
        sequenceNumber: partitionInfo.lastEnqueuedSequenceNumber
      });
      const eventDataBatch = await producerClient.createBatch({
        maxSizeInBytes: 5000,
        partitionId: "0"
      });
      const message = { body: `${Buffer.from("Z".repeat(4096))}` };
      for (let i = 1; i <= 3; i++) {
        const isAdded = eventDataBatch.tryAdd(message);
        if (!isAdded) {
          debug(`Unable to add ${i} event to the batch`);
          break;
        }
      }
      await producerClient.sendBatch(eventDataBatch);
      const data = await consumer.receiveBatch(3, 5);
      data.length.should.equal(1);
      message.body.should.equal(data[0].body);
      await consumer.close();
    });

    it("should throw when maxMessageSize is greater than maximum message size on the AMQP sender link", async function(): Promise<
      void
    > {
      let newClient: EventHubProducerClient = new EventHubProducerClient(
        service.connectionString,
        service.path
      );

      try {
        await newClient.createBatch({ maxSizeInBytes: 2046528 });
        throw new Error("Test Failure");
      } catch (err) {
        err.message.should.match(
          /.*Max message size \((\d+) bytes\) is greater than maximum message size \((\d+) bytes\) on the AMQP sender link.*/gi
        );
      } finally {
        await newClient.close();
      }
    });

    it("should support being cancelled", async function(): Promise<void> {
      let newClient: EventHubProducerClient | undefined;

      try {
        newClient = new EventHubProducerClient(service.connectionString, service.path);

        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);

        await newClient.createBatch({ abortSignal: abortSignal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The create batch operation has been cancelled by the user.");
      } finally {
        if (newClient) {
          await newClient.close();
        }
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      let newClient: EventHubProducerClient | undefined;

      const abortController = new AbortController();
      abortController.abort();
      try {
        newClient = new EventHubProducerClient(service.connectionString, service.path);

        const batch = await newClient.createBatch({ abortSignal: abortController.signal });
        batch.tryAdd({ body: "hello" });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The create batch operation has been cancelled by the user.");
      } finally {
        if (newClient) {
          await newClient.close();
        }
      }
    });
  });

  describe("multiple producers", function(): void {
    let consumerClient: EventHubConsumerClient;

    beforeEach(() => {
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
    });

    afterEach(() => {
      consumerClient.close();
    });
  });

  describe("Multiple messages", function(): void {
    let consumerClient: EventHubConsumerClient;

    beforeEach(() => {
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
    });

    afterEach(() => {
      consumerClient.close();
    });

    it("should be sent successfully in parallel", async function(): Promise<void> {
      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(client);

      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(sendBatch([`Hello World ${i}`]));
      }
      await Promise.all(promises);

      const subscription = await consumerClient.subscribe(subscriptionEventHandler, {
        startPosition
      });

      try {
        const events = await subscriptionEventHandler.waitForEvents(
          await client.getPartitionIds({}),
          5
        );

        // we've allowed the server to choose which partition the messages are distributed to
        // so our expectation here is just that all the bodies have arrived
        const bodiesOnly = events.map((evt) => evt.body);
        bodiesOnly.sort();

        bodiesOnly.should.deep.equal([
          "Hello World 0",
          "Hello World 1",
          "Hello World 2",
          "Hello World 3",
          "Hello World 4"
        ]);
      } finally {
        subscription.close();
      }
    });

    it("should be sent successfully in parallel, even when exceeding max event listener count of 1000", async function(): Promise<
      void
    > {
      const senderCount = 1200;
      try {
        const promises = [];
        for (let i = 0; i < senderCount; i++) {
          promises.push(sendBatch([`Hello World ${i}`]));
        }
        await Promise.all(promises);
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });

    it("should be sent successfully in parallel by multiple senders", async function(): Promise<
      void
    > {
      const senderCount = 3;
      try {
        const promises = [];
        for (let i = 0; i < senderCount; i++) {
          if (i === 0) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(await sendBatch([`Hello World ${i}`], "0"));
          } else if (i === 1) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(await sendBatch([`Hello World ${i}`], "1"));
          } else {
            debug(">>>>> Sending a message to the hub when i == %d", i);
            promises.push(await sendBatch([`Hello World ${i}`]));
          }
        }
        await Promise.all(promises);
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });
  });

  describe("Negative scenarios", function(): void {
    describe("on invalid partition ids like", function(): void {
      // tslint:disable-next-line: no-null-keyword
      const invalidIds = ["XYZ", "-1", "1000", "-"];
      invalidIds.forEach(function(id: string | null): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);

            await sendMessagesToPartitionForTest(
              id as any,
              { body: "Hello world!" },
              producerClient
            );
            debug("sent the message.");
            throw new Error("Test failure");
          } catch (err) {
            debug(`>>>> Received error for invalid partition id "${id}" - `, err);
            should.exist(err);
            err.message.should.match(
              /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
            );
          }
        });
      });

      const invalidIds2 = [" "];
      invalidIds2.forEach(function(id: string): void {
        it(`"${id}" should throw an invalid EventHub address error`, async function(): Promise<void> {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);
            await sendMessagesToPartitionForTest(
              id as any,
              { body: "Hello world!" },
              producerClient
            );

            debug("sent the message.");
            throw new Error("Test failure");
          } catch (err) {
            debug(`>>>> Received invalid EventHub address error for partition id "${id}" - `, err);
            should.exist(err);
            err.message.should.match(
              /.*Invalid EventHub address. It must be either of the following.*/gi
            );
          }
        });
      });
    });
  });

  async function sendBatch(
    bodies: any[],
    partitionId: string,
    options?: SendBatchOptions
  ): Promise<void>;
  async function sendBatch(bodies: any[], options?: SendBatchOptions): Promise<void>;
  async function sendBatch(
    bodies1: any[],
    partitionIdOrOptions2: string | SendBatchOptions | undefined,
    options3?: SendBatchOptions
  ): Promise<void> {
    let sendOptions: SendBatchOptions | undefined = options3;

    let partitionId: string | undefined = undefined;

    if (typeof partitionIdOrOptions2 !== "string") {
      sendOptions = partitionIdOrOptions2 as SendBatchOptions;
    } else {
      partitionId = partitionIdOrOptions2;
      sendOptions = options3;
    }

    const batch = await producerClient.createBatch({
      abortSignal: sendOptions && sendOptions.abortSignal,
      partitionId: partitionId
    });

    for (const body of bodies1) {
      batch.tryAdd({ body }).should.be.ok;
    }

    await producerClient.sendBatch(batch, sendOptions);
  }
}).timeout(20000);
