// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers/jobAgents/jobs/steps
 * Primary schema key: Microsoft.Sql/servers/jobAgents/jobs/steps
 * Also covers: Microsoft.Sql/servers, Microsoft.Sql/servers/databases, Microsoft.Sql/servers/jobAgents, Microsoft.Sql/servers/jobAgents/credentials, Microsoft.Sql/servers/jobAgents/jobs, Microsoft.Sql/servers/jobAgents/targetGroups
 * Scenario: learning-site/servers-jobagents-jobs-steps
 * provisioning API: Credential, Job, JobAgent, SqlServerJobStep, Server, ServerDatabase, TargetGroup
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.Sql/2025-01-01/servers/jobagents/jobs/steps.md
 * Operation: n/a
 * Runtime baseline: servers-jobagents-jobs-steps.test.baseline.bicep and servers-jobagents-jobs-steps.test.baseline.json
 * Gap/reduction: Learn resource format reduced to public constructor identity and source API version
 */

import {
  Credential,
  Job,
  JobAgent,
  SqlServerJobStep,
  Server,
  ServerDatabase,
  TargetGroup,
} from "@azure/provisioning-sql";
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
  const server0 = new Server(stack, {
    name: "serversjobagentsjobs",
    location: "eastus",
  });
  const jobAgent1 = new JobAgent(server0, {
    name: "serversjobagentsjobs",
    location: "eastus",
  });
  const credential2 = new Credential(jobAgent1, {
    name: "serversjobagentsjobs",
  });
  const job3 = new Job(jobAgent1, {
    name: "serversjobagentsjobs",
  });
  const jobStep4 = new SqlServerJobStep(job3, {
    name: "serversjobagentsjobs",
  });
  const serverDatabase5 = new ServerDatabase(server0, {
    name: "serversjobagentsjobs",
    location: "eastus",
  });
  const targetGroup6 = new TargetGroup(jobAgent1, {
    name: "serversjobagentsjobs",
  });
  return stack;
}

describe("learning-site/servers-jobagents-jobs-steps", () => {
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
