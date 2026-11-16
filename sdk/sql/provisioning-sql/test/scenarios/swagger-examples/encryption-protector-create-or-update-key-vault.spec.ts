// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/managedInstances/encryptionProtector
 * Primary schema key: Microsoft.Sql/managedInstances/encryptionProtector
 * Also covers: none
 * Scenario: swagger-examples/encryption-protector-create-or-update-key-vault
 * provisioning API: ManagedInstanceEncryptionProtector
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b1e7325f0722352d57f2408b35b038e9896844a8/specification/sql/resource-manager/Microsoft.Sql/SQL/examples/2025-01-01/EncryptionProtectorCreateOrUpdateKeyVault.json
 * Operation: n/a
 * Runtime baseline: encryption-protector-create-or-update-key-vault.test.baseline.bicep and encryption-protector-create-or-update-key-vault.test.baseline.json
 * Gap/reduction: path and query parameters omitted from the request-body contract
 */

import { ManagedInstance, ManagedInstanceEncryptionProtector } from "@azure/provisioning-sql";
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
  const managedInstance0 = new ManagedInstance(stack, {
    name: "encryptionprotectorc",
    location: "eastus",
  });
  new ManagedInstanceEncryptionProtector(managedInstance0, {
    name: "current",
    properties: {
      autoRotationEnabled: false,
      serverKeyName: "someVault_someKey_01234567890123456789012345678901",
      serverKeyType: "AzureKeyVault",
    },
  });
  return stack;
}

describe("swagger-examples/encryption-protector-create-or-update-key-vault", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Sql/managedInstances/encryptionProtector",
      apiVersion: "2025-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
