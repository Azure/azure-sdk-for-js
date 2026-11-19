// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces/queues
 * Primary schema key: Microsoft.ServiceBus/namespaces/queues
 * Also covers: none
 * Scenario: swagger-examples/sbqueue-authorization-rule-create
 * provisioning API: Queue
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/be97609d55160e8d06e2fcbba9ddefbf2ee89bf8/specification/servicebus/resource-manager/Microsoft.ServiceBus/ServiceBus/examples/2026-01-01/Queues/SBQueueAuthorizationRuleCreate.json
 * Operation: n/a
 * Runtime baseline: sbqueue-authorization-rule-create.test.baseline.bicep and sbqueue-authorization-rule-create.test.baseline.json
 * Gap/reduction: authorization-rule request body is not a queue request body and is excluded from the planned parent-resource scenario
 */

import { Namespace, Queue } from "@azure/provisioning-servicebus";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

type BuildScenarioHelpers = {
  createResourceGroupStack: (name?: string) => import("@azure/provisioning-core").Stack;
  createSubscriptionStack: (name?: string) => import("@azure/provisioning-core").Stack;
  values: {
    subscriptionId: string;
    tenantId: string;
    objectId: string;
    principalId: string;
    clientId: string;
    resourceGroupName: string;
    location: string;
    secondaryLocation: string;
  };
};

const values = {
  subscriptionId: "00000000-0000-0000-0000-000000000000",
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  principalId: "33333333-3333-3333-3333-333333333333",
  clientId: "44444444-4444-4444-4444-444444444444",
  resourceGroupName: "rg-cdk-package-test",
  location: "eastus",
  secondaryLocation: "westus",
};

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const namespace = new Namespace(stack, {
    existing: true,
    name: "sdk-Namespace-7982",
  });
  new Queue(namespace, {
    name: "sdk-Queues-2317",
    properties: {},
  });
  return stack;
}

describe("swagger-examples/sbqueue-authorization-rule-create", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.ServiceBus/namespaces/queues",
      apiVersion: "2026-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
