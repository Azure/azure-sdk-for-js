// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces
 * Also covers: none
 * Scenario: swagger-examples/cosmos-dbnotebook-workspace-create
 * provisioning API: NotebookWorkspace
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/e070ec9b11d1417d83170393ec90d7122e343e0f/specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2026-03-15/examples/CosmosDBNotebookWorkspaceCreate.json
 * Operation: NotebookWorkspaces_CreateOrUpdate
 * Runtime baseline: cosmos-dbnotebook-workspace-create.test.baseline.bicep and cosmos-dbnotebook-workspace-create.test.baseline.json
 * Gap/reduction: none
 */

import { DatabaseAccount, NotebookWorkspace } from "@azure/provisioning-cosmosdb";
import { deref } from "@azure/provisioning-core";
import { deserialize, serialize } from "@azure/provisioning-core/serialization";
import { describe, expect, it } from "vitest";

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
  const resource0 = new DatabaseAccount(stack, {
    name: "databaseaccount-test",
    existing: true,
  });
  const resource1 = new NotebookWorkspace(resource0, { name: "default" });
  stack.outputs.add("resource1Id", "string", resource1.id);
  return stack;
}

describe("swagger-examples/cosmos-dbnotebook-workspace-create", () => {
  it("preserves extensible names for new and existing notebook workspaces", () => {
    const stack = createResourceGroupStack();
    const account = new DatabaseAccount(stack, {
      existing: true,
      name: "databaseaccount-test",
    });
    const workspace = new NotebookWorkspace(account, { name: "custom" });
    const existing = new NotebookWorkspace(account, {
      existing: true,
      name: "another",
    });
    expect(deref(workspace.name)).toBe("custom");
    expect(deref(existing.name)).toBe("another");
    workspace.name = "renamed";
    expect(deref(workspace.name)).toBe("renamed");

    const rendered = renderStackArtifacts(stack);
    expect(rendered.outputs.bicep).toContain("name: 'renamed'");
    expect(rendered.outputs.bicep).toContain("name: 'another'");
    const [restored] = deserialize(rendered.outputs.json);
    expect(serialize(restored!)).toEqual(serialize(stack));
  });

  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces",
      apiVersion: "2026-03-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
