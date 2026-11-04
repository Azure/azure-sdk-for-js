// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Storage/storageAccounts/connectors
 * Primary schema key: Microsoft.Storage/storageAccounts/connectors
 * Also covers: none
 * Scenario: swagger-examples/storage-connectors-create
 * provisioning API: Connector
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/5d221767a7423e746d446de30dbbb5d60086722f/specification/storage/resource-manager/Microsoft.Storage/stable/2025-08-01/examples/StorageConnectorCRUD/StorageConnectors_Create.json
 * Operation: n/a
 * Runtime baseline: storage-connectors-create.test.baseline.bicep and storage-connectors-create.test.baseline.json
 * Gap/reduction: The Swagger example omits required DataShare auth and connection details.
 */

import { Connector, StorageAccount } from "@azure/provisioning-storage";
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

function buildScenarioStack({
  createResourceGroupStack,
  createSubscriptionStack,
  values,
}: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const storageAccount = new StorageAccount(stack, {
    existing: true,
    name: "sttest01",
  });
  new Connector(storageAccount, {
    name: "connector1",
    location: "eastus",
    properties: {
      description: "Example connector",
      dataSourceType: "Azure_DataShare",
      // @ts-expect-error preserve rendered source-shaped request object
      source: {
        type: "DataShare",
      },
    },
  });
  return stack;
}

describe("swagger-examples/storage-connectors-create", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Storage/storageAccounts/connectors",
      apiVersion: "2026-04-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
