// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider
 * Primary schema key: Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider
 * Also covers: none
 * Scenario: learning-site/accounts-testraiexternalsafetyprovider
 * provisioning API: RaiExternalSafetyProviderSchema
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.CognitiveServices/2026-07-01/accounts/testraiexternalsafetyprovider.md
 * Operation: n/a
 * Runtime baseline: accounts-testraiexternalsafetyprovider.test.baseline.bicep and accounts-testraiexternalsafetyprovider.test.baseline.json
 * Gap/reduction: Microsoft Learn resource-format placeholders were replaced with deterministic provider-valid values.
 */

import { Account, RaiExternalSafetyProviderSchema } from "@azure/provisioning-cognitiveservices";
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
  const account = new Account(stack, {
    existing: true,
    name: "cognitive-account",
  });
  new RaiExternalSafetyProviderSchema(account, {
    name: "accounts-testraiexternalsafetyprovider",
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

describe("learning-site/accounts-testraiexternalsafetyprovider", () => {
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
