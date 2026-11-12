// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts/encryptionScopes
 * Primary schema key: Microsoft.CognitiveServices/accounts/encryptionScopes
 * Also covers: none
 * Scenario: swagger-examples/list-encryption-scopes
 * provisioning API: EncryptionScope
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/09685799a1c25766ba250f5cd6051659be8a4e50/specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/CognitiveServices/examples/2026-07-01/ListEncryptionScopes.json
 * Operation: n/a
 * Runtime baseline: list-encryption-scopes.test.baseline.bicep and list-encryption-scopes.test.baseline.json
 * Gap/reduction: Path and query parameters and response payloads were omitted from the request-body contract.
 */

import { Account, EncryptionScope } from "@azure/provisioning-cognitiveservices";
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
  const account = new Account(stack, {
    existing: true,
    name: "cognitive-account",
  });
  new EncryptionScope(account, {
    existing: true,
    name: "encryptionScope",
  });
  return stack;
}

describe("swagger-examples/list-encryption-scopes", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.CognitiveServices/accounts/encryptionScopes",
      apiVersion: "2026-07-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
