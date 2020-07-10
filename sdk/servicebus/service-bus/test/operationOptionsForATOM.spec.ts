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

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const assert = chai.assert;

dotenv.config();

const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusManagementClient = new ServiceBusManagementClient(
  env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]
);

describe("Operation Options", () => {
  const enitityName1 = "random-name";
  const enitityName2 = "random-name-2";
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
          await serviceBusAtomManagementClient.createQueue(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getQueue(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("updateQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.updateQueue(
            { name: enitityName1 },
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("deleteQueue", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.deleteQueue(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueueRuntimeinfo", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getQueueRuntimeInfo(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueues", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getQueues({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getQueuesRuntimeinfo", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getQueuesRuntimeInfo({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("createTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.createTopic(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getTopic(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("updateTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.updateTopic(
            { name: enitityName1 },
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("deleteTopic", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.deleteTopic(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopicRuntimeinfo", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getTopicRuntimeInfo(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopics", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getTopics({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getTopicsRuntimeinfo", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getTopicsRuntimeInfo({
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("createSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.createSubscription(
            { topicName: enitityName1, subscriptionName: enitityName2 },
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("getSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getSubscription(enitityName1, enitityName2, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("updateSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.updateSubscription(
            { topicName: enitityName1, subscriptionName: enitityName2 },
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("deleteSubscription", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.deleteSubscription(enitityName1, enitityName2, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getSubscriptionRuntimeinfo", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getSubscriptionRuntimeInfo(
            enitityName1,
            enitityName2,
            {
              abortSignal: AbortController.timeout(1)
            }
          )
      );
    });
    it("getSubscriptions", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getSubscriptions(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
    it("getSubscriptionsRuntimeinfo", async () => {
      await verifyAbortError(
        async () =>
          await serviceBusAtomManagementClient.getSubscriptionsRuntimeInfo(enitityName1, {
            abortSignal: AbortController.timeout(1)
          })
      );
    });
  });

  describe("RequestOptions timeout", () => {
    // This test makes sure the timeout is plumbed as expected
    it("requestOptions.timeout should work", async () => {
      try {
        await serviceBusAtomManagementClient.createQueue(enitityName1, {
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
});
