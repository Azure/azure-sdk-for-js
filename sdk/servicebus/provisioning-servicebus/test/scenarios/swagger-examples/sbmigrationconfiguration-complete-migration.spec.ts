// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces/migrationConfigurations
 * Primary schema key: Microsoft.ServiceBus/namespaces/migrationConfigurations
 * Also covers: none
 * Scenario: swagger-examples/sbmigrationconfiguration-complete-migration
 * provisioning API: MigrationConfigProperties
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/be97609d55160e8d06e2fcbba9ddefbf2ee89bf8/specification/servicebus/resource-manager/Microsoft.ServiceBus/ServiceBus/examples/2026-01-01/Migrationconfigurations/SBMigrationconfigurationCompleteMigration.json
 * Operation: n/a
 * Runtime baseline: sbmigrationconfiguration-complete-migration.test.baseline.bicep and sbmigrationconfiguration-complete-migration.test.baseline.json
 * Gap/reduction: complete-migration action has no resource request body; represented by the existing singleton resource
 */

import { MigrationConfigProperties, Namespace } from "@azure/provisioning-servicebus";
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
    name: "sdk-Namespace-41",
  });
  new MigrationConfigProperties(namespace, {
    name: "$default",
    existing: true,
  });
  return stack;
}

describe("swagger-examples/sbmigrationconfiguration-complete-migration", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.ServiceBus/namespaces/migrationConfigurations",
      apiVersion: "2026-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
