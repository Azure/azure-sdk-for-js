// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers/jobAgents/jobs/versions/steps
 * Primary schema key: Microsoft.Sql/servers/jobAgents/jobs/versions/steps
 * Also covers: none
 * Scenario: learning-site/servers-jobagents-jobs-versions-steps
 * provisioning API: SqlServerJobVersionStep
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.Sql/2025-01-01/servers/jobagents/jobs/versions/steps.md
 * Operation: n/a
 * Runtime baseline: servers-jobagents-jobs-versions-steps.test.baseline.bicep and servers-jobagents-jobs-versions-steps.test.baseline.json
 * Gap/reduction: Learn resource format reduced to public constructor identity and source API version
 */

import { Job, JobAgent, Server, Version, SqlServerJobVersionStep } from "@azure/provisioning-sql";
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
  const job2 = new Job(jobAgent1, {
    name: "serversjobagentsjobs",
  });
  // @ts-expect-error The generated public type uses string although Bicep requires an integer version name.
  const version3 = new Version(job2, { existing: true, name: 1 });
  new SqlServerJobVersionStep(version3, {
    existing: true,
    name: "step1",
  });
  return stack;
}

describe("learning-site/servers-jobagents-jobs-versions-steps", () => {
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
