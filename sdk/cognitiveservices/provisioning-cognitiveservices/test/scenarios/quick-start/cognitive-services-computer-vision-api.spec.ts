// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts
 * Primary schema key: Microsoft.CognitiveServices/accounts
 * Also covers: none
 * Scenario: quick-start/cognitive-services-computer-vision-api
 * provisioning API: Account
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.cognitiveservices/cognitive-services-Computer-vision-API/main.bicep
 * Operation: n/a
 * Runtime baseline: cognitive-services-computer-vision-api.test.baseline.bicep and cognitive-services-computer-vision-api.test.baseline.json
 * Gap/reduction: Quickstart parameters and uniqueString expressions were reduced to deterministic test values.
 */

import { Account } from "@azure/provisioning-cognitiveservices";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  new Account(stack, {
    name: "computerVisionTest",
    location: "eastus",
    identity: {
      type: "SystemAssigned",
    },
    kind: "ComputerVision",
    sku: {
      name: "F0",
    },
    properties: {
      publicNetworkAccess: "Disabled",
      networkAcls: {
        defaultAction: "Deny",
      },
      disableLocalAuth: true,
    },
  });
  return stack;
}

describe("quick-start/cognitive-services-computer-vision-api", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderOutputsToMatchSample(import.meta.url, rendered.outputs);
  });
});
