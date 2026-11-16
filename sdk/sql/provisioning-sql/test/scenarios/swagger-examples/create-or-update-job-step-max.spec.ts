// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers/jobAgents/jobs
 * Primary schema key: Microsoft.Sql/servers/jobAgents/jobs
 * Also covers: none
 * Scenario: swagger-examples/create-or-update-job-step-max
 * provisioning API: Job
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b1e7325f0722352d57f2408b35b038e9896844a8/specification/sql/resource-manager/Microsoft.Sql/SQL/examples/2025-01-01/CreateOrUpdateJobStepMax.json
 * Operation: n/a
 * Runtime baseline: create-or-update-job-step-max.test.baseline.bicep and create-or-update-job-step-max.test.baseline.json
 * Gap/reduction: nested request-body fields unsupported by Job omitted: properties, path and query parameters omitted from the request-body contract, request-body fields unsupported by Job omitted: properties
 */

import { Job, JobAgent, Server } from "@azure/provisioning-sql";
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
  const server0 = new Server(stack, {
    name: "server1",
    location: "eastus",
  });
  const jobAgent1 = new JobAgent(server0, {
    name: "agent1",
    location: "eastus",
  });
  new Job(jobAgent1, {
    name: "agent1",
  });
  return stack;
}

describe("swagger-examples/create-or-update-job-step-max", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Sql/servers/jobAgents/jobs",
      apiVersion: "2025-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
