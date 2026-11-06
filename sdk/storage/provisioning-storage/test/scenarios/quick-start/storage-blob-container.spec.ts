// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Storage/storageAccounts
 * Primary schema key: Microsoft.Storage/storageAccounts
 * Also covers: Microsoft.Storage/storageAccounts/blobServices, Microsoft.Storage/storageAccounts/blobServices/containers
 * Scenario: quick-start/storage-blob-container
 * provisioning API: BlobService, Container, StorageAccount
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/76ebee01174760670852cb99dc1c742719e03bdf/quickstarts/microsoft.storage/storage-blob-container/main.bicep
 * Operation: n/a
 * Runtime baseline: storage-blob-container.test.baseline.bicep and storage-blob-container.test.baseline.json
 * Gap/reduction: none
 */

import { BlobService, Container, StorageAccount } from "@azure/provisioning-storage";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
    name: "sttest01",
    location: "eastus",
    sku: {
      name: "Standard_LRS",
    },
    kind: "StorageV2",
  });
  const blobService = new BlobService(storageAccount, {});
  new Container(blobService, {
    name: "container1",
  });
  return stack;
}

describe("quick-start/storage-blob-container", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderOutputsToMatchSample(import.meta.url, rendered.outputs);
  });
});
