// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/workspaces
 * Primary schema key: Microsoft.OperationalInsights/workspaces
 * Also covers: Microsoft.OperationalInsights/workspaces/dataExports, Microsoft.OperationalInsights/workspaces/dataSources, Microsoft.OperationalInsights/workspaces/linkedServices, Microsoft.OperationalInsights/workspaces/linkedStorageAccounts, Microsoft.OperationalInsights/workspaces/networkSecurityPerimeterConfigurations, Microsoft.OperationalInsights/workspaces/savedSearches, Microsoft.OperationalInsights/workspaces/storageInsightConfigs, Microsoft.OperationalInsights/workspaces/summaryLogs, Microsoft.OperationalInsights/workspaces/tables
 * Scenario: public-entrypoints/public-entrypoints-workspace
 * provisioning API: DataExport, DataSource, LinkedService, LinkedStorageAccount, NetworkSecurityPerimeterConfiguration, SavedSearch, StorageInsight, SummaryLog, Table, Workspace
 * Source: packages\services\operationalinsights\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-workspace.test.baseline.bicep and public-entrypoints-workspace.test.baseline.json
 * Gap/reduction: none
 */

import {
  DataExport,
  DataSource,
  LinkedService,
  LinkedStorageAccount,
  NetworkSecurityPerimeterConfiguration,
  SavedSearch,
  StorageInsight,
  SummaryLog,
  Table,
  Workspace,
} from "@azure/provisioning-operationalinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const workspace = new Workspace(stack, {
    name: "public-workspace",
    location: values.location,
    properties: {
      retentionInDays: 30,
      sku: { name: "PerGB2018" },
    },
  });
  new DataExport(workspace, {
    name: "public-export",
    properties: {
      destination: {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.EventHub/namespaces/public-eventhub",
      },
      tableNames: ["Heartbeat"],
    },
  });
  new DataSource(workspace, {
    name: "public-datasource",
    kind: "AzureActivityLog",
    properties: {},
  });
  new LinkedService(workspace, {
    name: "public-linked-service",
    properties: {},
  });
  new LinkedStorageAccount(workspace, {
    name: "CustomLogs",
    properties: {},
  });
  new NetworkSecurityPerimeterConfiguration(workspace, {
    existing: true,
    name: "public-nsp",
  });
  new SavedSearch(workspace, {
    name: "public-saved-search",
    properties: {
      category: "public",
      displayName: "public saved search",
      query: "Heartbeat | take 10",
    },
  });
  new StorageInsight(workspace, {
    name: "public-storage-insight",
    properties: {
      storageAccount: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/publicstorage",
        key: "key",
      },
    },
  });
  new SummaryLog(workspace, {
    name: "publicsummary",
  });
  new Table(workspace, {
    name: "PublicTable_CL",
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-workspace", () => {
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
