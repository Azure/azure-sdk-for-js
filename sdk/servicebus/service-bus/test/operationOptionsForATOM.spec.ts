// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import * as dotenv from "dotenv";
import { ServiceBusManagementClient } from "../src/serviceBusAtomManagementClient";
import { EnvVarNames, getEnvVars } from "./utils/envVarUtils";
import { AbortController } from "@azure/abort-controller";
import { WebResource } from "@azure/core-http";
import { executeAtomXmlOperation } from "../src/util/atomXmlHelper";
import { NamespaceResourceSerializer } from "../src/serializers/namespaceResourceSerializer";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const assert = chai.assert;

dotenv.config();

const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusManagementClient = new ServiceBusManagementClient(
  env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]
);

describe("Operation Options", () => {
  const entityName1 = "random-name";
  const entityName2 = "random-name-2";
  // This describe block ensures that abort signal works as expected and
  // the OperationOptions are plugged in for all the methods
  describe("Abort Signal", () => {
    async function verifyAbortError(func: Function) {
      try {
        await func();
        assert.fail();
      } catch (err) {
        assert.equal(err.name, "AbortError");
        assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
      }
    }

    it("getNamespaceProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getNamespaceProperties({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("createQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.createQueue(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getQueue(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("updateQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.updateQueue({ name: entityName1 } as any, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("deleteQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.deleteQueue(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueueRuntimeProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getQueueRuntimeProperties(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueues", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient["getQueues"]({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueuesRuntimeProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient["getQueuesRuntimeProperties"]({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("createTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.createTopic(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getTopic(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("updateTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.updateTopic({ name: entityName1 } as any, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("deleteTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.deleteTopic(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopicRuntimeProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getTopicRuntimeProperties(entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopics", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient["getTopics"]({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopicsRuntimeProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient["getTopicsRuntimeProperties"]({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("createSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.createSubscription(
            entityName1,  entityName2 ,
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("getSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getSubscription(entityName1, entityName2, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("updateSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.updateSubscription(
            { topicName: entityName1, subscriptionName: entityName2 } as any,
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("deleteSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.deleteSubscription(entityName1, entityName2, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getSubscriptionRuntimeProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getSubscriptionRuntimeProperties(
            entityName1,
            entityName2,
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("getSubscriptions", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient["getSubscriptions"](entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getSubscriptionsRuntimeProperties", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient["getSubscriptionsRuntimeProperties"](entityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
  });

  describe("RequestOptions timeout", () => {
    // This test makes sure the timeout is plumbed as expected
    it("requestOptions.timeout should work", async () => {
      try {
        await serviceBusAtomManagementClient.createQueue(entityName1, {
          requestOptions: { timeout: 1 }
        });
        assert.fail();
      } catch (err) {
        assert.equal(err.name, "AbortError");
        assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
      }
    });
  });

  describe("RequestOptions custom headers", () => {
    it("requestOptions.customHeaders should be populated", async () => {
      const webResource = new WebResource(
        `https://${(serviceBusAtomManagementClient as any).endpoint}/`
      );
      await executeAtomXmlOperation(
        serviceBusAtomManagementClient,
        webResource,
        new NamespaceResourceSerializer(),
        {
          requestOptions: {
            customHeaders: { state: "WA" }
          }
        }
      );
      assert.equal(
        webResource.headers.get("state"),
        "WA",
        "Custom header from the requestOptions is not populated as expected."
      );
    });
  });

  describe("Tracing", () => {
    it("getNamespaceProperties with tracing", async () => {
      const tracer = new TestTracer();
      setTracer(tracer);
      const rootSpan = tracer.startSpan("root");
      await serviceBusAtomManagementClient.getNamespaceProperties({
        tracingOptions: { spanOptions: { parent: rootSpan.context() } }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
      assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.ServiceBus.ServiceBusManagementClient-getNamespaceProperties",
                children: [
                  {
                    children: [
                      {
                        children: [],
                        name: "/$namespaceinfo"
                      }
                    ],
                    name: "Azure.ServiceBus.ServiceBusManagementClient-getResource"
                  }
                ]
              }
            ]
          }
        ]
      };

      assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
      assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
    });
  });
});
