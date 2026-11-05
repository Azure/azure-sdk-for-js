// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/raiPolicy
 * Primary schema key: Microsoft.CognitiveServices/raiPolicy
 * Also covers: none
 * Scenario: public-entrypoints/public-entrypoints-rai-policy
 * provisioning API: RaiPolicy
 * Source: packages\services\cognitiveservices\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-rai-policy.test.baseline.bicep and public-entrypoints-rai-policy.test.baseline.json
 * Gap/reduction: none
 */

import { RaiPolicy } from "@azure/provisioning-cognitiveservices";
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
  new RaiPolicy(stack, {
    name: "rai-policy",
    properties: {
      basePolicyName: "Microsoft.Default",
      mode: "Blocking",
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-rai-policy", () => {
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
