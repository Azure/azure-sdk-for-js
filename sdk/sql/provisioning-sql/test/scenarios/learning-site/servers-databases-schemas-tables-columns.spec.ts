// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers/databases/schemas/tables/columns
 * Primary schema key: Microsoft.Sql/servers/databases/schemas/tables/columns
 * Also covers: none
 * Scenario: learning-site/servers-databases-schemas-tables-columns
 * provisioning API: SqlDatabaseColumn
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.Sql/2025-01-01/servers/databases/schemas/tables/columns.md
 * Operation: n/a
 * Runtime baseline: servers-databases-schemas-tables-columns.test.baseline.bicep and servers-databases-schemas-tables-columns.test.baseline.json
 * Gap/reduction: Learn resource format reduced to public constructor identity and source API version
 */

import {
  Server,
  ServerDatabase,
  SqlDatabaseSchema,
  SqlDatabaseTable,
  SqlDatabaseColumn,
} from "@azure/provisioning-sql";
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
  const server0 = new Server(stack, {
    name: "serversdatabasessche",
    location: "eastus",
  });
  const serverDatabase1 = new ServerDatabase(server0, {
    name: "serversdatabasessche",
    location: "eastus",
  });
  const serverDatabaseSchema2 = new SqlDatabaseSchema(serverDatabase1, {
    existing: true,
    name: "serversdatabasessche",
  });
  const serverDatabaseSchemaTable3 = new SqlDatabaseTable(serverDatabaseSchema2, {
    existing: true,
    name: "serversdatabasessche",
  });
  new SqlDatabaseColumn(serverDatabaseSchemaTable3, {
    existing: true,
    name: "serversdatabasessche",
  });
  return stack;
}

describe("learning-site/servers-databases-schemas-tables-columns", () => {
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
