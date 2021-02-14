// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:sender-spec");
import {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  ReceivedEventData,
  SendBatchOptions
} from "../src";
import {
  EnvVarKeys,
  getEnvVars,
  getStartingPositionsForTests,
  setTracerForTest
} from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
import { SpanGraph, TestSpan } from "@azure/core-tracing";
import { TRACEPARENT_PROPERTY } from "../src/diagnostics/instrumentEventData";
import { SubscriptionHandlerForTests } from "./utils/subscriptionHandlerForTests";
const env = getEnvVars();

describe("EventHub Sender", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;
  let startPosition: { [partitionId: string]: EventPosition };

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

  beforeEach(async () => {
    debug("Creating the clients..");
    producerClient = new EventHubProducerClient(service.connectionString, service.path);
    consumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      service.connectionString,
      service.path
    );
    startPosition = await getStartingPositionsForTests(consumerClient);
  });

  afterEach(async () => {
    debug("Closing the clients..");
    await producerClient.close();
    await consumerClient.close();
  });

  describe("Create batch", function(): void {
    describe("tryAdd", function() {
      it("doesn't grow if invalid events are added", async () => {
        const batch = await producerClient.createBatch({ maxSizeInBytes: 20 });
        const event = { body: Buffer.alloc(30).toString() };

        const numToAdd = 5;
        let failures = 0;
        for (let i = 0; i < numToAdd; i++) {
          if (!batch.tryAdd(event)) {
            failures++;
          }
        }

        failures.should.equal(5);
        batch.sizeInBytes.should.equal(0);
      });
    });

    it("partitionId is set as expected", async () => {
      const batch = await producerClient.createBatch({
        partitionId: "0"
      });
      should.equal(batch.partitionId, "0");
    });

    it("partitionId is set as expected when it is 0 i.e. falsy", async () => {
      const batch = await producerClient.createBatch({
        //@ts-expect-error
        partitionId: 0
      });
      should.equal(batch.partitionId, "0");
    });

    it("partitionKey is set as expected", async () => {
      const batch = await producerClient.createBatch({
        partitionKey: "boo"
      });
      should.equal(batch.partitionKey, "boo");
    });

    it("partitionKey is set as expected when it is 0 i.e. falsy", async () => {
      const batch = await producerClient.createBatch({
        //@ts-expect-error
        partitionKey: 0
      });
      should.equal(batch.partitionKey, "0");
    });

    it("maxSizeInBytes is set as expected", async () => {
      const batch = await producerClient.createBatch({ maxSizeInBytes: 30 });
      should.equal(batch.maxSizeInBytes, 30);
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
      batch.tryAdd({ body: list[1] }).should.not.be.ok; // The Mike message will be rejected - it's over the limit.
      batch.tryAdd({ body: list[2] }).should.be.ok; // Marie should get added";

      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(producerClient);

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

    it("should be sent successfully when partitionId is 0 i.e. falsy", async function(): Promise<
      void
    > {
      const list = ["Albert", "Marie"];

      const batch = await producerClient.createBatch({
        //@ts-expect-error
        partitionId: 0
      });

      batch.partitionId!.should.equal("0");
      should.not.exist(batch.partitionKey);
      batch.maxSizeInBytes.should.be.gt(0);

      batch.tryAdd({ body: list[0] }).should.be.ok;
      batch.tryAdd({ body: list[1] }).should.be.ok;

      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(producerClient);

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

      list.should.be.deep.eq(
        receivedEvents.map((event) => event.body),
        "Received messages should be equal to our sent messages"
      );
    });

    it("should be sent successfully when partitionKey is 0 i.e. falsy", async function(): Promise<
      void
    > {
      const list = ["Albert", "Marie"];

      const batch = await producerClient.createBatch({
        //@ts-expect-error
        partitionKey: 0
      });

      batch.partitionKey!.should.equal("0");
      should.not.exist(batch.partitionId);
      batch.maxSizeInBytes.should.be.gt(0);

      batch.tryAdd({ body: list[0] }).should.be.ok;
      batch.tryAdd({ body: list[1] }).should.be.ok;

      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(producerClient);

      const subscriber = consumerClient.subscribe(subscriptionEventHandler, {
        startPosition
      });
      await producerClient.sendBatch(batch);

      let receivedEvents;
      const allPartitionIds = await producerClient.getPartitionIds();
      try {
        receivedEvents = await subscriptionEventHandler.waitForEvents(allPartitionIds, 2);
      } finally {
        await subscriber.close();
      }

      list.should.be.deep.eq(
        receivedEvents.map((event) => event.body),
        "Received messages should be equal to our sent messages"
      );
    });

    it("should be sent successfully with properties", async function(): Promise<void> {
      const properties = { test: "super" };
      const list = [
        { body: "Albert-With-Properties", properties },
        { body: "Mike-With-Properties", properties },
        { body: "Marie-With-Properties", properties }
      ];

      const batch = await producerClient.createBatch({
        partitionId: "0"
      });

      batch.maxSizeInBytes.should.be.gt(0);

      batch.tryAdd(list[0]).should.be.ok;
      batch.tryAdd(list[1]).should.be.ok;
      batch.tryAdd(list[2]).should.be.ok;

      const receivedEvents: ReceivedEventData[] = [];
      let waitUntilEventsReceivedResolver: Function;
      const waitUntilEventsReceived = new Promise((r) => (waitUntilEventsReceivedResolver = r));

      const sequenceNumber = (await consumerClient.getPartitionProperties("0"))
        .lastEnqueuedSequenceNumber;

      const subscriber = consumerClient.subscribe(
        "0",
        {
          async processError() {},
          async processEvents(events) {
            receivedEvents.push(...events);
            if (receivedEvents.length >= 3) {
              waitUntilEventsReceivedResolver();
            }
          }
        },
        {
          startPosition: {
            sequenceNumber
          },
          maxBatchSize: 3
        }
      );

      await producerClient.sendBatch(batch);
      await waitUntilEventsReceived;
      await subscriber.close();

      sequenceNumber.should.be.lessThan(receivedEvents[0].sequenceNumber);
      sequenceNumber.should.be.lessThan(receivedEvents[1].sequenceNumber);
      sequenceNumber.should.be.lessThan(receivedEvents[2].sequenceNumber);

      [list[0], list[1], list[2]].should.be.deep.eq(
        receivedEvents.map((event) => {
          return {
            body: event.body,
            properties: event.properties
          };
        }),
        "Received messages should be equal to our sent messages"
      );
    });

    it("can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

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
      resetTracer();
    });

    it("will not instrument already instrumented events", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

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
      resetTracer();
    });

    it("will support tracing batch and send", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

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
            parent: rootSpan.context()
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
      resetTracer();
    });

    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const eventDataBatch = await producerClient.createBatch({ partitionKey: "1" });
      for (let i = 0; i < 5; i++) {
        eventDataBatch.tryAdd({ body: `Hello World ${i}` });
      }
      await producerClient.sendBatch(eventDataBatch);
    });

    it("with max message size should be sent successfully.", async function(): Promise<void> {
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
      eventDataBatch.count.should.equal(1);
    });

    // TODO: Enable this test https://github.com/Azure/azure-sdk-for-js/issues/9202 is fixed
    it.skip("should support being cancelled", async function(): Promise<void> {
      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await producerClient.createBatch({ abortSignal: abortSignal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The create batch operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const abortController = new AbortController();
      abortController.abort();
      try {
        await producerClient.createBatch({ abortSignal: abortController.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The create batch operation has been cancelled by the user.");
      }
    });
  });

  describe("Multiple sendBatch calls", function(): void {
    it("should be sent successfully in parallel", async function(): Promise<void> {
      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(consumerClient);

      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(producerClient.sendBatch([{ body: `Hello World ${i}` }]));
      }
      await Promise.all(promises);

      const subscription = await consumerClient.subscribe(subscriptionEventHandler, {
        startPosition
      });

      try {
        const events = await subscriptionEventHandler.waitForEvents(
          await consumerClient.getPartitionIds({}),
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
          promises.push(producerClient.sendBatch([{ body: `Hello World ${i}` }]));
        }
        await Promise.all(promises);
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });

    it("should be sent successfully in parallel by multiple clients", async function(): Promise<
      void
    > {
      const senderCount = 3;
      try {
        const promises = [];
        for (let i = 0; i < senderCount; i++) {
          if (i === 0) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(
              await producerClient.sendBatch([{ body: `Hello World ${i}` }], { partitionId: "0" })
            );
          } else if (i === 1) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(
              await producerClient.sendBatch([{ body: `Hello World ${i}` }], { partitionId: "1" })
            );
          } else {
            debug(">>>>> Sending a message to the hub when i == %d", i);
            promises.push(await producerClient.sendBatch([{ body: `Hello World ${i}` }]));
          }
        }
        await Promise.all(promises);
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });

    it("should fail when a message greater than 1 MB is sent and succeed when a normal message is sent after that on the same link.", async function(): Promise<
      void
    > {
      const data: EventData = {
        body: Buffer.from("Z".repeat(1300000))
      };
      try {
        debug("Sending a message of 300KB...");
        await producerClient.sendBatch([data], { partitionId: "0" });
        throw new Error("Test failure");
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.code, "MessageTooLargeError");
        err.message.should.match(
          /.*The received message \(delivery-id:(\d+), size:(\d+) bytes\) exceeds the limit \((\d+) bytes\) currently allowed on the link\..*/gi
        );
      }
      await producerClient.sendBatch([{ body: "Hello World EventHub!!" }], { partitionId: "0" });
      debug("Sent the message successfully on the same link..");
    });

    it("can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const events = [];
      for (let i = 0; i < 5; i++) {
        events.push({ body: `multiple messages - manual trace propgation: ${i}` });
      }
      await producerClient.sendBatch(events, {
        partitionId: "0",
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root spans.");
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
                name: "Azure.EventHubs.message",
                children: []
              },
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

      resetTracer();
    });

    it("skips already instrumented events when manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const events: EventData[] = [];
      for (let i = 0; i < 5; i++) {
        events.push({ body: `multiple messages - manual trace propgation: ${i}` });
      }
      events[0].properties = { [TRACEPARENT_PROPERTY]: "foo" };
      await producerClient.sendBatch(events, {
        partitionId: "0",
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root spans.");
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

      resetTracer();
    });
  });

  describe("Array of events", function() {
    it("should be sent successfully", async () => {
      const data: EventData[] = [{ body: "Hello World 1" }, { body: "Hello World 2" }];
      const receivedEvents: ReceivedEventData[] = [];
      let receivingResolver: Function;

      const receivingPromise = new Promise((r) => (receivingResolver = r));
      const subscription = consumerClient.subscribe(
        {
          async processError() {},
          async processEvents(events) {
            receivedEvents.push(...events);
            receivingResolver();
          }
        },
        {
          startPosition,
          maxBatchSize: data.length
        }
      );

      await producerClient.sendBatch(data);

      await receivingPromise;
      await subscription.close();

      receivedEvents.length.should.equal(data.length);
      receivedEvents.map((e) => e.body).should.eql(data.map((d) => d.body));
    });

    it("should be sent successfully with partitionKey", async () => {
      const data: EventData[] = [{ body: "Hello World 1" }, { body: "Hello World 2" }];
      const receivedEvents: ReceivedEventData[] = [];
      let receivingResolver: Function;
      const receivingPromise = new Promise((r) => (receivingResolver = r));
      const subscription = consumerClient.subscribe(
        {
          async processError() {},
          async processEvents(events) {
            receivedEvents.push(...events);
            receivingResolver();
          }
        },
        {
          startPosition,
          maxBatchSize: data.length
        }
      );

      await producerClient.sendBatch(data, { partitionKey: "foo" });

      await receivingPromise;
      await subscription.close();

      receivedEvents.length.should.equal(data.length);
      receivedEvents.map((e) => e.body).should.eql(data.map((d) => d.body));
      for (let i = 0; i < receivedEvents.length; i++) {
        receivedEvents[i].body.should.equal(data[i].body);
      }
    });

    it("should be sent successfully with partitionId", async () => {
      const partitionId = "0";
      const data: EventData[] = [{ body: "Hello World 1" }, { body: "Hello World 2" }];
      const receivedEvents: ReceivedEventData[] = [];
      let receivingResolver: Function;
      const receivingPromise = new Promise((r) => (receivingResolver = r));
      const subscription = consumerClient.subscribe(
        partitionId,
        {
          async processError() {},
          async processEvents(events) {
            receivedEvents.push(...events);
            receivingResolver();
          }
        },
        {
          startPosition,
          maxBatchSize: data.length
        }
      );

      await producerClient.sendBatch(data, { partitionId });

      await receivingPromise;
      await subscription.close();

      receivedEvents.length.should.equal(data.length);
      receivedEvents.map((e) => e.body).should.eql(data.map((d) => d.body));
      for (let i = 0; i < receivedEvents.length; i++) {
        receivedEvents[i].body.should.equal(data[i].body);
      }
    });

    it("can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const events = [];
      for (let i = 0; i < 5; i++) {
        events.push({ body: `multiple messages - manual trace propgation: ${i}` });
      }
      await producerClient.sendBatch(events, {
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root spans.");
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
                name: "Azure.EventHubs.message",
                children: []
              },
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

      const knownSendSpans = tracer
        .getKnownSpans()
        .filter((span: TestSpan) => span.name === "Azure.EventHubs.send");
      knownSendSpans.length.should.equal(1, "There should have been one send span.");
      knownSendSpans[0].attributes.should.deep.equal({
        "az.namespace": "Microsoft.EventHub",
        "message_bus.destination": producerClient.eventHubName,
        "peer.address": producerClient.fullyQualifiedNamespace
      });
      resetTracer();
    });

    it("skips already instrumented events when manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const events: EventData[] = [];
      for (let i = 0; i < 5; i++) {
        events.push({ body: `multiple messages - manual trace propgation: ${i}` });
      }
      events[0].properties = { [TRACEPARENT_PROPERTY]: "foo" };
      await producerClient.sendBatch(events, {
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root spans.");
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
      resetTracer();
    });

    it("should support being cancelled", async function(): Promise<void> {
      try {
        const data: EventData[] = [
          {
            body: "Sender Cancellation Test - timeout 0"
          }
        ];
        // call send() once to create a connection
        await producerClient.sendBatch(data);
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await producerClient.sendBatch(data, { abortSignal });
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
        await producerClient.sendBatch(data, { abortSignal: abortController.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should throw when partitionId and partitionKey are provided", async function(): Promise<
      void
    > {
      try {
        const data: EventData[] = [
          {
            body: "Sender paritition id and partition key"
          }
        ];
        await producerClient.sendBatch(data, { partitionKey: "1", partitionId: "0" });
        throw new Error("Test Failure");
      } catch (err) {
        err.message.should.equal(
          "The partitionId (0) and partitionKey (1) cannot both be specified."
        );
      }
    });
  });

  describe("Validation", function() {
    describe("createBatch", function() {
      it("throws an error if partitionId and partitionKey are set", async () => {
        try {
          await producerClient.createBatch({ partitionId: "0", partitionKey: "boo" });
          throw new Error("Test failure");
        } catch (error) {
          error.message.should.equal(
            "partitionId and partitionKey cannot both be set when creating a batch"
          );
        }
      });

      it("throws an error if partitionId and partitionKey are set and partitionId is 0 i.e. falsy", async () => {
        try {
          await producerClient.createBatch({
            //@ts-expect-error
            partitionId: 0,
            partitionKey: "boo"
          });
          throw new Error("Test failure");
        } catch (error) {
          error.message.should.equal(
            "partitionId and partitionKey cannot both be set when creating a batch"
          );
        }
      });

      it("throws an error if partitionId and partitionKey are set and partitionKey is 0 i.e. falsy", async () => {
        try {
          await producerClient.createBatch({
            partitionId: "1",
            //@ts-expect-error
            partitionKey: 0
          });
          throw new Error("Test failure");
        } catch (error) {
          error.message.should.equal(
            "partitionId and partitionKey cannot both be set when creating a batch"
          );
        }
      });

      it("should throw when maxMessageSize is greater than maximum message size on the AMQP sender link", async function(): Promise<
        void
      > {
        try {
          await producerClient.createBatch({ maxSizeInBytes: 2046528 });
          throw new Error("Test Failure");
        } catch (err) {
          err.message.should.match(
            /.*Max message size \((\d+) bytes\) is greater than maximum message size \((\d+) bytes\) on the AMQP sender link.*/gi
          );
        }
      });
    });
    describe("sendBatch with EventDataBatch", function() {
      it("works if partitionKeys match", async () => {
        const misconfiguredOptions: SendBatchOptions = {
          partitionKey: "foo"
        };
        const batch = await producerClient.createBatch({ partitionKey: "foo" });
        await producerClient.sendBatch(batch, misconfiguredOptions);
      });
      it("works if partitionIds match", async () => {
        const misconfiguredOptions: SendBatchOptions = {
          partitionId: "0"
        };
        const batch = await producerClient.createBatch({ partitionId: "0" });
        await producerClient.sendBatch(batch, misconfiguredOptions);
      });
      it("throws an error if partitionKeys don't match", async () => {
        const badOptions: SendBatchOptions = {
          partitionKey: "bar"
        };
        const batch = await producerClient.createBatch({ partitionKey: "foo" });
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionKey (bar) set on sendBatch does not match the partitionKey (foo) set when creating the batch."
          );
        }
      });
      it("throws an error if partitionKeys don't match (undefined)", async () => {
        const badOptions: SendBatchOptions = {
          partitionKey: "bar"
        };
        const batch = await producerClient.createBatch();
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionKey (bar) set on sendBatch does not match the partitionKey (undefined) set when creating the batch."
          );
        }
      });
      it("throws an error if partitionIds don't match", async () => {
        const badOptions: SendBatchOptions = {
          partitionId: "0"
        };
        const batch = await producerClient.createBatch({ partitionId: "1" });
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionId (0) set on sendBatch does not match the partitionId (1) set when creating the batch."
          );
        }
      });
      it("throws an error if partitionIds don't match (undefined)", async () => {
        const badOptions: SendBatchOptions = {
          partitionId: "0"
        };
        const batch = await producerClient.createBatch();
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionId (0) set on sendBatch does not match the partitionId (undefined) set when creating the batch."
          );
        }
      });
      it("throws an error if partitionId and partitionKey are set (create, send)", async () => {
        const badOptions: SendBatchOptions = {
          partitionKey: "foo"
        };
        const batch = await producerClient.createBatch({ partitionId: "0" });
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.not.equal("Test failure");
        }
      });
      it("throws an error if partitionId and partitionKey are set (send, create)", async () => {
        const badOptions: SendBatchOptions = {
          partitionId: "0"
        };
        const batch = await producerClient.createBatch({ partitionKey: "foo" });
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.not.equal("Test failure");
        }
      });
      it("throws an error if partitionId and partitionKey are set (send, send)", async () => {
        const badOptions: SendBatchOptions = {
          partitionKey: "foo",
          partitionId: "0"
        };
        const batch = await producerClient.createBatch();
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.not.equal("Test failure");
        }
      });
    });

    describe("sendBatch with EventDataBatch with events array", function() {
      it("throws an error if partitionId and partitionKey are set", async () => {
        const badOptions: SendBatchOptions = {
          partitionKey: "foo",
          partitionId: "0"
        };
        const batch = [{ body: "Hello 1" }, { body: "Hello 2" }];
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionId (0) and partitionKey (foo) cannot both be specified."
          );
        }
      });
      it("throws an error if partitionId and partitionKey are set with partitionId set to 0 i.e. falsy", async () => {
        const badOptions: SendBatchOptions = {
          partitionKey: "foo",
          //@ts-expect-error
          partitionId: 0
        };
        const batch = [{ body: "Hello 1" }, { body: "Hello 2" }];
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionId (0) and partitionKey (foo) cannot both be specified."
          );
        }
      });
      it("throws an error if partitionId and partitionKey are set with partitionKey set to 0 i.e. falsy", async () => {
        const badOptions: SendBatchOptions = {
          //@ts-expect-error
          partitionKey: 0,
          partitionId: "0"
        };
        const batch = [{ body: "Hello 1" }, { body: "Hello 2" }];
        try {
          await producerClient.sendBatch(batch, badOptions);
          throw new Error("Test failure");
        } catch (err) {
          err.message.should.equal(
            "The partitionId (0) and partitionKey (0) cannot both be specified."
          );
        }
      });
    });
  });

  describe("Negative scenarios", function(): void {
    it("a message greater than 1 MB should fail.", async function(): Promise<void> {
      const data: EventData = {
        body: Buffer.from("Z".repeat(1300000))
      };
      try {
        await producerClient.sendBatch([data]);
        throw new Error("Test failure");
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.code, "MessageTooLargeError");
        err.message.should.match(
          /.*The received message \(delivery-id:(\d+), size:(\d+) bytes\) exceeds the limit \((\d+) bytes\) currently allowed on the link\..*/gi
        );
      }
    });

    describe("on invalid partition ids like", function(): void {
      // tslint:disable-next-line: no-null-keyword
      const invalidIds = ["XYZ", "-1", "1000", "-"];
      invalidIds.forEach(function(id: string | null): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);
            await producerClient.sendBatch([{ body: "Hello world!" }], {
              partitionId: id as any
            });
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
    });
  });
}).timeout(20000);
