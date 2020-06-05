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

import { EventHubClient } from "../src/impl/eventHubClient";
import { AbortController } from "@azure/abort-controller";
import { SpanGraph } from "@azure/core-tracing";
describe("RuntimeInformation", function(): void {
  let client: EventHubClient;
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

  afterEach("close the connection", async function(): Promise<void> {
    await client.close();
  });

  function arrayOfIncreasingNumbersFromZero(length: any): Array<string> {
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = `${i}`;
    }
    return result;
  }

  describe("getPartitionIds", function(): void {
    it("returns an array of partition IDs", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      const ids = await client.getPartitionIds({});
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
    });

    it("respects cancellationTokens", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await client.getPartitionIds({
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("can be ran in parallel without retries", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path, {
        retryOptions: {
          maxRetries: 0
        }
      });
      const results = await Promise.all([client.getPartitionIds({}), client.getPartitionIds({})]);

      for (const result of results) {
        result.should.have.members(arrayOfIncreasingNumbersFromZero(result.length));
      }
    });
  });

  it("can be manually traced", async function(): Promise<void> {
    const { tracer, resetTracer } = setTracerForTest();

    const rootSpan = tracer.startSpan("root");
    client = new EventHubClient(service.connectionString, service.path);
    const ids = await client.getPartitionIds({
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
              name: "Azure.EventHubs.getPartitionIds",
              children: [
                {
                  name: "Azure.EventHubs.getEventHubProperties",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };

    tracer.getSpanGraph(rootSpan.context().traceId).should.eql(expectedGraph);
    tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
    resetTracer();
  });

  describe("hub runtime information", function(): void {
    it("gets the hub runtime information", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path, {
        userAgent: "/js-event-processor-host=0.2.0"
      });
      const hubRuntimeInfo = await client.getProperties();
      debug(hubRuntimeInfo);
      hubRuntimeInfo.name.should.equal(service.path);

      hubRuntimeInfo.partitionIds.should.have.members(
        arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
      );
      hubRuntimeInfo.createdOn.should.be.instanceof(Date);
    });

    it("can cancel a request for hub runtime information", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path, {
        userAgent: "/js-event-processor-host=0.2.0"
      });
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await client.getProperties({
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      client = new EventHubClient(service.connectionString, service.path);
      const hubRuntimeInfo = await client.getProperties({
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
    it("should throw an error if partitionId is missing", async function(): Promise<void> {
      try {
        client = new EventHubClient(service.connectionString, service.path);
        await client.getPartitionProperties(undefined as any);
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(
          `getPartitionProperties called without required argument "partitionId"`
        );
      }
    });

    it("gets the partition runtime information with partitionId as a string", async function(): Promise<
      void
    > {
      client = new EventHubClient(service.connectionString, service.path);
      const partitionRuntimeInfo = await client.getPartitionProperties("0");
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    it("gets the partition runtime information with partitionId as a number", async function(): Promise<
      void
    > {
      client = new EventHubClient(service.connectionString, service.path);
      const partitionRuntimeInfo = await client.getPartitionProperties(0 as any);
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubName.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    const invalidIds = ["XYZ", -1, 1000, "-", " ", ""];
    invalidIds.forEach(function(id: any): void {
      it(`should fail the partition runtime information when partitionId is "${id}"`, async function(): Promise<void> {
        try {
          client = new EventHubClient(service.connectionString, service.path);
          await client.getPartitionProperties(id as any);
          throw new Error("Test failure");
        } catch (err) {
          debug(`>>>> Received error - `, err);
          should.exist(err);
          err.message.should.match(
            /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
          );
        }
      });
    });

    it("can cancel a request for getPartitionInformation", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await client.getPartitionProperties("0", {
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });

    it("can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");
      client = new EventHubClient(service.connectionString, service.path);
      const partitionRuntimeInfo = await client.getPartitionProperties("0", {
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
