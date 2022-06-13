// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import * as dotenv from "dotenv";
import { ServiceBusAdministrationClient } from "../../src";
import { EnvVarNames, getEnvVars } from "../public/utils/envVarUtils";
import { AbortController } from "@azure/abort-controller";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { executeAtomXmlOperation } from "../../src/util/atomXmlHelper";
import { NamespaceResourceSerializer } from "../../src/serializers/namespaceResourceSerializer";
import { SpanGraph } from "@azure/test-utils";
import { setSpan, context } from "@azure/core-tracing";
import { setTracerForTest } from "../public/utils/misc";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const assert = chai.assert;

dotenv.config();

const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusAdministrationClient =
  new ServiceBusAdministrationClient(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);

describe("Operation Options", () => {
  const entityName1 = "random-name";
  const entityName2 = "random-name-2";
  // This describe block ensures that abort signal works as expected and
  // the OperationOptions are plugged in for all the methods
  describe("Abort Signal", () => {
    async function verifyAbortError(func: () => Promise<any>): Promise<void> {
      try {
        await func();
        assert.fail();
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }
    }

    it("getNamespaceProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getNamespaceProperties({
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("createQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.createQueue(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getQueue(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("updateQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.updateQueue({ name: entityName1 } as any, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("deleteQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.deleteQueue(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getQueueRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getQueueRuntimeProperties(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getQueues", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getQueues"]({
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getQueuesRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getQueuesRuntimeProperties"]({
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("createTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.createTopic(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getTopic(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("updateTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.updateTopic({ name: entityName1 } as any, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("deleteTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.deleteTopic(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getTopicRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getTopicRuntimeProperties(entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getTopics", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getTopics"]({
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getTopicsRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getTopicsRuntimeProperties"]({
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("createSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.createSubscription(entityName1, entityName2, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getSubscription(entityName1, entityName2, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("updateSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.updateSubscription(
          { topicName: entityName1, subscriptionName: entityName2 } as any,
          {
            abortSignal: AbortController.timeout(1),
          }
        )
      );
    });
    it("deleteSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.deleteSubscription(entityName1, entityName2, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getSubscriptionRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getSubscriptionRuntimeProperties(entityName1, entityName2, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getSubscriptions", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getSubscriptions"](entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
    it("getSubscriptionsRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getSubscriptionsRuntimeProperties"](entityName1, {
          abortSignal: AbortController.timeout(1),
        })
      );
    });
  });

  describe("RequestOptions timeout", () => {
    // This test makes sure the timeout is plumbed as expected
    it("requestOptions.timeout should work", async () => {
      try {
        await serviceBusAtomManagementClient.createQueue(entityName1, {
          requestOptions: { timeout: 1 },
        });
        assert.fail();
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }
    });
  });

  describe("RequestOptions custom headers", () => {
    it("requestOptions.customHeaders should be populated", async () => {
      const request = createPipelineRequest({
        url: `https://${(serviceBusAtomManagementClient as any).endpoint}/`,
      });
      await executeAtomXmlOperation(
        serviceBusAtomManagementClient,
        request,
        new NamespaceResourceSerializer(),
        {
          requestOptions: {
            customHeaders: { state: "WA" },
          },
        }
      );
      assert.equal(
        request.headers.get("state"),
        "WA",
        "Custom header from the requestOptions is not populated as expected."
      );
    });
  });

  describe("Tracing", () => {
    it("getNamespaceProperties with tracing", async () => {
      const { tracer, resetTracer } = setTracerForTest();
      try {
        const rootSpan = tracer.startSpan("root");
        await serviceBusAtomManagementClient.getNamespaceProperties({
          tracingOptions: { tracingContext: setSpan(context.active(), rootSpan) },
        });
        rootSpan.end();

        const rootSpans = tracer.getRootSpans();
        assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
        assert.strictEqual(
          rootSpan,
          rootSpans[0],
          "The root span should match what was passed in."
        );

        const expectedGraph: SpanGraph = {
          roots: [
            {
              name: rootSpan.name,
              children: [
                {
                  name: "Azure.ServiceBus.ServiceBusAdministrationClient-getNamespaceProperties",
                  children: [
                    {
                      children: [],
                      name: "Azure.ServiceBus.ServiceBusAdministrationClient-getResource",
                    },
                  ],
                },
              ],
            },
          ],
        };

        assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
        assert.strictEqual(
          tracer.getActiveSpans().length,
          0,
          "All spans should have had end called"
        );
      } finally {
        resetTracer();
      }
    });
  });
});
