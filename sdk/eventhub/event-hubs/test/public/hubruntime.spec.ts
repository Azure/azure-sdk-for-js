// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:hubruntime-spec");
import { EnvVarKeys, getEnvVars, setTracerForTest } from "./utils/testUtils";
const env = getEnvVars();

import { AbortController } from "@azure/abort-controller";
import { SpanGraph } from "@azure/core-tracing";
import { EventHubProducerClient, EventHubConsumerClient, MessagingError } from "../../src";

describe("RuntimeInformation", function(): void {
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
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
  });

  afterEach("close the connection", async function(): Promise<void> {
    await producerClient.close();
    await consumerClient.close();
  });

  function arrayOfIncreasingNumbersFromZero(length: any): Array<string> {
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = `${i}`;
    }
    return result;
  }

  describe("getPartitionIds", function(): void {
    it("EventHubProducerClient returns an array of partition IDs", async function(): Promise<void> {
      const ids = await producerClient.getPartitionIds({});
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
    });

    it("EventHubConsumerClient returns an array of partition IDs", async function(): Promise<void> {
      const ids = await consumerClient.getPartitionIds({});
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
    });

    it("EventHubProducerClient respects cancellationTokens", async function(): Promise<void> {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await producerClient.getPartitionIds({
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("EventHubConsumerClient respects cancellationTokens", async function(): Promise<void> {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await consumerClient.getPartitionIds({
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("EventHubProducerClient can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      const ids = await producerClient.getPartitionIds({
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
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
                name: "Azure.EventHubs.getEventHubProperties",
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

    it("EventHubConsumerClient can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      const ids = await consumerClient.getPartitionIds({
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
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
                name: "Azure.EventHubs.getEventHubProperties",
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

  describe("hub runtime information", function(): void {
    it("EventHubProducerClient gets the hub runtime information", async function(): Promise<void> {
      const hubRuntimeInfo = await producerClient.getEventHubProperties();
      debug(hubRuntimeInfo);
      hubRuntimeInfo.name.should.equal(service.path);

      hubRuntimeInfo.partitionIds.should.have.members(
        arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
      );
      hubRuntimeInfo.createdOn.should.be.instanceof(Date);
    });

    it("EventHubConsumerClient gets the hub runtime information", async function(): Promise<void> {
      const hubRuntimeInfo = await consumerClient.getEventHubProperties();
      debug(hubRuntimeInfo);
      hubRuntimeInfo.name.should.equal(service.path);

      hubRuntimeInfo.partitionIds.should.have.members(
        arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
      );
      hubRuntimeInfo.createdOn.should.be.instanceof(Date);
    });

    it("EventHubProducerClient can cancel a request for hub runtime information", async function(): Promise<
      void
    > {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await producerClient.getEventHubProperties({
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("EventHubConsumerClient can cancel a request for hub runtime information", async function(): Promise<
      void
    > {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await consumerClient.getEventHubProperties({
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("EventHubProducerClient can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      const hubRuntimeInfo = await producerClient.getEventHubProperties({
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      hubRuntimeInfo.partitionIds.should.have.members(
        arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
      );
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
                name: "Azure.EventHubs.getEventHubProperties",
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

    it("EventHubConsumerClient can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      const hubRuntimeInfo = await consumerClient.getEventHubProperties({
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      hubRuntimeInfo.partitionIds.should.have.members(
        arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
      );
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
                name: "Azure.EventHubs.getEventHubProperties",
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

  describe("partition runtime information", function(): void {
    it("EventHubProducerClient should throw an error if partitionId is missing", async function(): Promise<
      void
    > {
      try {
        await producerClient.getPartitionProperties(undefined as any);
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(
          `getPartitionProperties called without required argument "partitionId"`
        );
      }
    });

    it("EventHubConsumerClient should throw an error if partitionId is missing", async function(): Promise<
      void
    > {
      try {
        await consumerClient.getPartitionProperties(undefined as any);
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(
          `getPartitionProperties called without required argument "partitionId"`
        );
      }
    });

    it("EventHubProducerClient gets the partition runtime information with partitionId as a string", async function(): Promise<
      void
    > {
      const partitionRuntimeInfo = await producerClient.getPartitionProperties("0");
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    it("EventHubConsumerClient gets the partition runtime information with partitionId as a string", async function(): Promise<
      void
    > {
      const partitionRuntimeInfo = await consumerClient.getPartitionProperties("0");
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    it("EventHubProducerClient gets the partition runtime information with partitionId as a number", async function(): Promise<
      void
    > {
      const partitionRuntimeInfo = await producerClient.getPartitionProperties(0 as any);
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    it("EventHubConsumerClient gets the partition runtime information with partitionId as a number", async function(): Promise<
      void
    > {
      const partitionRuntimeInfo = await consumerClient.getPartitionProperties(0 as any);
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    it("EventHubProducerClient bubbles up error from service for invalid partitionId", async function(): Promise<
      void
    > {
      try {
        await producerClient.getPartitionProperties("boo");
        throw new Error("Test failure");
      } catch (err) {
        debug(`>>>> Received error - `, err);
        should.exist(err);
        should.equal((err as MessagingError).code, "ArgumentOutOfRangeError");
      }
    });

    it("EventHubConsumerClient bubbles up error from service for invalid partitionId", async function(): Promise<
      void
    > {
      try {
        await consumerClient.getPartitionProperties("boo");
        throw new Error("Test failure");
      } catch (err) {
        debug(`>>>> Received error - `, err);
        should.exist(err);
        should.equal((err as MessagingError).code, "ArgumentOutOfRangeError");
      }
    });

    it("EventHubProducerClient can cancel a request for getPartitionInformation", async function(): Promise<
      void
    > {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await producerClient.getPartitionProperties("0", {
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("EventHubConsumerClient can cancel a request for getPartitionInformation", async function(): Promise<
      void
    > {
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await consumerClient.getPartitionProperties("0", {
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("EventHubProducerClient can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      const partitionRuntimeInfo = await producerClient.getPartitionProperties("0", {
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
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
                name: "Azure.EventHubs.getPartitionProperties",
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

    it("EventHubConsumerClient can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      const partitionRuntimeInfo = await consumerClient.getPartitionProperties("0", {
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
      });
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
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
                name: "Azure.EventHubs.getPartitionProperties",
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
}).timeout(60000);
