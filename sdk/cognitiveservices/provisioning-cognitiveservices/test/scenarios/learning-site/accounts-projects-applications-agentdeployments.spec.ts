// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments
 * Primary schema key: Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments
 * Also covers: none
 * Scenario: learning-site/accounts-projects-applications-agentdeployments
 * provisioning API: CognitiveServicesAgentDeployment
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.CognitiveServices/2026-07-01/accounts/projects/applications/agentdeployments.md
 * Operation: n/a
 * Runtime baseline: accounts-projects-applications-agentdeployments.test.baseline.bicep and accounts-projects-applications-agentdeployments.test.baseline.json
 * Gap/reduction: Microsoft Learn resource-format placeholders were replaced with deterministic provider-valid values.
 */

import {
  Account,
  CognitiveServicesAgentDeployment,
  Application,
  Project,
} from "@azure/provisioning-cognitiveservices";
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
  const project = new Project(account, {
    existing: true,
    name: "cognitive-project",
  });
  const application = new Application(project, {
    existing: true,
    name: "agent-application",
  });
  const agentDeployment = new CognitiveServicesAgentDeployment(application, {
    name: "accounts-projects-applications-agentdeployments",
    properties: {
      deploymentType: "Hosted",
      displayName: "sample deployment",
      maxReplicas: 1,
      minReplicas: 1,
    },
  });
  return stack;
}

describe("learning-site/accounts-projects-applications-agentdeployments", () => {
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
