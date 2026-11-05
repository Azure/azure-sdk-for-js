// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups
 * Primary schema key: Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups
 * Also covers: none
 * Scenario: public-entrypoints/public-entrypoints-long-term-retention-backup
 * provisioning API: SubscriptionLongTermRetentionBackup
 * Source: packages\services\sql\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-long-term-retention-backup.test.baseline.bicep and public-entrypoints-long-term-retention-backup.test.baseline.json
 * Gap/reduction: public entrypoint graph reduced to deterministic resource identities
 */

import { SubscriptionLongTermRetentionBackup } from "@azure/provisioning-sql";
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

function buildScenarioStack({ createSubscriptionStack }: BuildScenarioHelpers) {
  const stack = createSubscriptionStack();
  const longTermRetentionBackup0 = new SubscriptionLongTermRetentionBackup(stack, {
    existing: true,
    name: "eastus/longtermretentionser/longtermretentiondat/publicentrypointslon",
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-long-term-retention-backup", () => {
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
