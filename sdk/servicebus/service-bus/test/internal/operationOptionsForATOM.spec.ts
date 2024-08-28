// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceBusAdministrationClient } from "../../src/index.js";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { executeAtomXmlOperation } from "../../src/util/atomXmlHelper.js";
import { NamespaceResourceSerializer } from "../../src/serializers/namespaceResourceSerializer.js";
import { getFullyQualifiedNamespace } from "../public/utils/testutils2.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert } from "vitest";

chai.use(chaiAsPromised);
chai.use(chaiExclude);

const serviceBusAtomManagementClient: ServiceBusAdministrationClient =
  new ServiceBusAdministrationClient(getFullyQualifiedNamespace(), createTestCredential());

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
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("createQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.createQueue(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getQueue(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("updateQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.updateQueue({ name: entityName1 } as any, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("deleteQueue", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.deleteQueue(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getQueueRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getQueueRuntimeProperties(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getQueues", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getQueues"]({
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getQueuesRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getQueuesRuntimeProperties"]({
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("createTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.createTopic(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getTopic(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("updateTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.updateTopic({ name: entityName1 } as any, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("deleteTopic", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.deleteTopic(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getTopicRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getTopicRuntimeProperties(entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getTopics", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getTopics"]({
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getTopicsRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getTopicsRuntimeProperties"]({
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("createSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.createSubscription(entityName1, entityName2, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getSubscription(entityName1, entityName2, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("updateSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.updateSubscription(
          { topicName: entityName1, subscriptionName: entityName2 } as any,
          {
            abortSignal: AbortSignal.timeout(1),
          },
        ),
      );
    });
    it("deleteSubscription", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.deleteSubscription(entityName1, entityName2, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getSubscriptionRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient.getSubscriptionRuntimeProperties(entityName1, entityName2, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getSubscriptions", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getSubscriptions"](entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
      );
    });
    it("getSubscriptionsRuntimeProperties", async () => {
      await verifyAbortError(async () =>
        serviceBusAtomManagementClient["getSubscriptionsRuntimeProperties"](entityName1, {
          abortSignal: AbortSignal.timeout(1),
        }),
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
        },
      );
      assert.equal(
        request.headers.get("state"),
        "WA",
        "Custom header from the requestOptions is not populated as expected.",
      );
    });
  });

  describe("Tracing", () => {
    it("getNamespaceProperties with tracing", async () => {
      await assert.supportsTracing(
        (options) =>
          serviceBusAtomManagementClient.getNamespaceProperties({
            tracingOptions: options.tracingOptions,
          }),
        ["ServiceBusAdministrationClient.getNamespaceProperties"],
      );
    });
  });
});
