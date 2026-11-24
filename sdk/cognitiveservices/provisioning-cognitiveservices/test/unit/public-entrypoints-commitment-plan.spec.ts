// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/commitmentPlans
 * Primary schema key: Microsoft.CognitiveServices/commitmentPlans
 * Also covers: Microsoft.CognitiveServices/commitmentPlans/accountAssociations
 * Scenario: public-entrypoints/public-entrypoints-commitment-plan
 * provisioning API: AccountAssociation, CognitiveServicesCommitmentPlan
 * Source: packages\services\cognitiveservices\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-commitment-plan.test.baseline.bicep and public-entrypoints-commitment-plan.test.baseline.json
 * Gap/reduction: none
 */

import {
  AccountAssociation,
  CognitiveServicesCommitmentPlan,
} from "@azure/provisioning-cognitiveservices";
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

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const commitmentPlan = new CognitiveServicesCommitmentPlan(stack, {
    name: "commitment-plan",
    kind: "AIServices",
    location: "eastus",
    sku: {
      name: "S0",
    },
    properties: {
      autoRenew: true,
      hostingModel: "ConnectedContainer",
    },
  });
  new AccountAssociation(commitmentPlan, {
    name: "commitment-plan",
    properties: {
      accountId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.CognitiveServices/accounts/cognitive-account",
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-commitment-plan", () => {
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
