// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:hubruntime-spec");
import { EnvVarKeys, getEnvVars, setTracerForTest } from "./utils/testUtils";
import { setSpan, context } from "@azure/core-tracing";

import { SpanGraph } from "@azure/test-utils";
import {
  EventHubBufferedProducerClient,
  EventHubProducerClient,
  EventHubConsumerClient,
  MessagingError
} from "../../src";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";
import { createMockServer } from "./utils/mockService";

type ClientCommonMethods = Pick<
  EventHubProducerClient,
  "close" | "getEventHubProperties" | "getPartitionIds" | "getPartitionProperties"
>;

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

  describe("RuntimeInformation", function(): void {
    const clientTypes = [
      "EventHubBufferedProducerClient",
      "EventHubConsumerClient",
      "EventHubProducerClient"
    ] as const;
    const clientMap = new Map<typeof clientTypes[number], ClientCommonMethods>();

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
      clientMap.set(
        "EventHubBufferedProducerClient",
        new EventHubBufferedProducerClient(service.connectionString, service.path)
      );
      clientMap.set(
        "EventHubConsumerClient",
        new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        )
      );
      clientMap.set(
        "EventHubProducerClient",
        new EventHubProducerClient(service.connectionString, service.path)
      );
    });

    afterEach("close the connection", async function(): Promise<void> {
      for (const client of clientMap.values()) {
        await client?.close();
      }
    });

    function arrayOfIncreasingNumbersFromZero(length: any): Array<string> {
      const result = new Array(length);
      for (let i = 0; i < length; i++) {
        result[i] = `${i}`;
      }
      return result;
    }

    clientTypes.forEach((clientType) => {
      describe(`${clientType}.getPartitionIds`, () => {
        it("returns an array of partition ids", async () => {
          const client = clientMap.get(clientType)!;
          const ids = await client.getPartitionIds({});
          ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
        });

        it("can be manually traced", async () => {
          const client = clientMap.get(clientType)!;
          const { tracer, resetTracer } = setTracerForTest();

          const rootSpan = tracer.startSpan("root");
          const ids = await client.getPartitionIds({
            tracingOptions: {
              tracingContext: setSpan(context.active(), rootSpan)
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

          tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
          tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
          resetTracer();
        });
      });

      describe(`${clientType}.getEventHubProperties`, () => {
        it("gets the Event Hub runtime information", async () => {
          const client = clientMap.get(clientType)!;
          const hubRuntimeInfo = await client.getEventHubProperties();
          hubRuntimeInfo.name.should.equal(service.path);

          hubRuntimeInfo.partitionIds.should.have.members(
            arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
          );
          hubRuntimeInfo.createdOn.should.be.instanceof(Date);
        });

        it("can be manually traced", async function(): Promise<void> {
          const client = clientMap.get(clientType)!;
          const { tracer, resetTracer } = setTracerForTest();

          const rootSpan = tracer.startSpan("root");
          const hubRuntimeInfo = await client.getEventHubProperties({
            tracingOptions: {
              tracingContext: setSpan(context.active(), rootSpan)
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

          tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
          tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
          resetTracer();
        });
      });

      describe(`${clientType}.getPartitionProperties`, () => {
        it("should throw an error if partitionId is missing", async () => {
          try {
            const client = clientMap.get(clientType)!;
            await client.getPartitionProperties(undefined as any);
            throw new Error("Test failure");
          } catch (err) {
            (err as any).name.should.equal("TypeError");
            (err as any).message.should.equal(
              `getPartitionProperties called without required argument "partitionId"`
            );
          }
        });

        it("gets the partition runtime information with partitionId as a string", async () => {
          const client = clientMap.get(clientType)!;
          const partitionRuntimeInfo = await client.getPartitionProperties("0");
          partitionRuntimeInfo.partitionId.should.equal("0");
          partitionRuntimeInfo.eventHubName.should.equal(service.path);
          partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
          should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
          should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
        });

        it("gets the partition runtime information with partitionId as a number", async () => {
          const client = clientMap.get(clientType)!;
          const partitionRuntimeInfo = await client.getPartitionProperties(0 as any);
          partitionRuntimeInfo.partitionId.should.equal("0");
          partitionRuntimeInfo.eventHubName.should.equal(service.path);
          partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
          should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
          should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
        });

        it("bubbles up error from service for invalid partitionId", async () => {
          try {
            const client = clientMap.get(clientType)!;
            await client.getPartitionProperties("boo");
            throw new Error("Test failure");
          } catch (err) {
            should.exist(err);
            should.equal((err as MessagingError).code, "ArgumentOutOfRangeError");
          }
        });

        it("can be manually traced", async () => {
          const client = clientMap.get(clientType)!;
          const { tracer, resetTracer } = setTracerForTest();

          const rootSpan = tracer.startSpan("root");
          const partitionRuntimeInfo = await client.getPartitionProperties("0", {
            tracingOptions: {
              tracingContext: setSpan(context.active(), rootSpan)
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

          tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
          tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
          resetTracer();
        });
      });
    });
  }).timeout(60000);
});
