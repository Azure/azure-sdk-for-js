// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider
 * Primary schema key: Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider
 * Also covers: none
 * Scenario: swagger-examples/test-rai-external-safety-provider
 * provisioning API: RaiExternalSafetyProviderSchema
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/09685799a1c25766ba250f5cd6051659be8a4e50/specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/CognitiveServices/examples/2026-07-01/TestRaiExternalSafetyProvider.json
 * Operation: n/a
 * Runtime baseline: test-rai-external-safety-provider.test.baseline.bicep and test-rai-external-safety-provider.test.baseline.json
 * Gap/reduction: Path and query parameters and response payloads were omitted from the request-body contract.
 */

import { Account, RaiExternalSafetyProviderSchema } from "@azure/provisioning-cognitiveservices";
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
  const raiExternalSafetyProviderSchema = new RaiExternalSafetyProviderSchema(account, {
    name: "mySafetyProvider",
    properties: {
      keyVaultUri: "https://contoso-vault.vault.azure.net/",
      managedIdentity: "f3b9c2e7-4aad-4b1f-9d9c-9e9b1e9b1f9b",
      mode: "sync",
      providerId: "00000000-0000-0000-0000-000000000000",
      providerName: "safetyProviderName",
      secretName: "safety-provider-secret",
      url: "https://example-safety-provider.contoso.com/webhook",
    },
  });
  return stack;
}

describe("swagger-examples/test-rai-external-safety-provider", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider",
      apiVersion: "2026-07-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
