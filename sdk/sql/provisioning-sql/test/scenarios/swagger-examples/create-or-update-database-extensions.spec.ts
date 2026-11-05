// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers/databases/extensions
 * Primary schema key: Microsoft.Sql/servers/databases/extensions
 * Also covers: none
 * Scenario: swagger-examples/create-or-update-database-extensions
 * provisioning API: Extension
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b1e7325f0722352d57f2408b35b038e9896844a8/specification/sql/resource-manager/Microsoft.Sql/SQL/examples/2025-01-01/CreateOrUpdateDatabaseExtensions.json
 * Operation: n/a
 * Runtime baseline: create-or-update-database-extensions.test.baseline.bicep and create-or-update-database-extensions.test.baseline.json
 * Gap/reduction: path and query parameters omitted from the request-body contract
 */

import { Extension, Server, ServerDatabase } from "@azure/provisioning-sql";
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
  const server0 = new Server(stack, {
    name: "srv_1ffd1cf8-9951-47fb-807d-a9c384763849",
    location: "eastus",
  });
  const serverDatabase1 = new ServerDatabase(server0, {
    name: "878e303f-1ea0-4f17-aa3d-a22ac5e9da08",
    location: "eastus",
  });
  const extension2 = new Extension(serverDatabase1, {
    name: "polybaseimport",
    properties: {
      operationMode: "PolybaseImport",
      storageKey:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      storageKeyType: "StorageAccessKey",
      storageUri: "https://teststorage.blob.core.windows.net/testcontainer/Manifest.xml",
    },
  });
  return stack;
}

describe("swagger-examples/create-or-update-database-extensions", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Sql/servers/databases/extensions",
      apiVersion: "2025-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
