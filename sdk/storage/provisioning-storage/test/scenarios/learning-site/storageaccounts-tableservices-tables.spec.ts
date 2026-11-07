// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Storage/storageAccounts/tableServices/tables
 * Primary schema key: Microsoft.Storage/storageAccounts/tableServices/tables
 * Also covers: Microsoft.Storage/storageAccounts, Microsoft.Storage/storageAccounts/tableServices
 * Scenario: learning-site/storageaccounts-tableservices-tables
 * provisioning API: StorageAccount, Table, TableService
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/1d0adb980ad73f9884804e888103df6c86d98ba8/arm-schema-ref/Microsoft.Storage/2025-08-01/storageaccounts/tableservices/tables.md
 * Operation: n/a
 * Runtime baseline: storageaccounts-tableservices-tables.test.baseline.bicep and storageaccounts-tableservices-tables.test.baseline.json
 * Gap/reduction: none
 */

import { StorageAccount, Table, TableService } from "@azure/provisioning-storage";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
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
  const storageAccount = new StorageAccount(stack, {
    name: "sttest01",
    location: "eastus",
    sku: {
      name: "Standard_LRS",
    },
    kind: "StorageV2",
  });
  const tableService = new TableService(storageAccount, {});
  new Table(tableService, {
    name: "table1",
  });
  return stack;
}

describe("learning-site/storageaccounts-tableservices-tables", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
