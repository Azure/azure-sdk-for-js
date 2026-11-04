// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems
 * Primary schema key: Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems
 * Also covers: none
 * Scenario: learning-site/accounts-raiblocklists-raiblocklistitems
 * provisioning API: RaiBlocklistItem
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.CognitiveServices/2026-07-01/accounts/raiblocklists/raiblocklistitems.md
 * Operation: n/a
 * Runtime baseline: accounts-raiblocklists-raiblocklistitems.test.baseline.bicep and accounts-raiblocklists-raiblocklistitems.test.baseline.json
 * Gap/reduction: Microsoft Learn resource-format placeholders were replaced with deterministic provider-valid values.
 */

import { Account, RaiBlocklist, RaiBlocklistItem } from "@azure/provisioning-cognitiveservices";
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
  const raiBlocklist = new RaiBlocklist(account, {
    existing: true,
    name: "myblocklist",
  });
  const raiBlocklistItem = new RaiBlocklistItem(raiBlocklist, {
    name: "accounts-raiblocklists-raiblocklistitems",
    properties: {
      isRegex: true,
      pattern: "^[a-z0-9_-]{2,16}$",
    },
  });
  return stack;
}

describe("learning-site/accounts-raiblocklists-raiblocklistitems", () => {
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
