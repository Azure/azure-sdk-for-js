// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers/jobAgents/jobs/executions
 * Primary schema key: Microsoft.Sql/servers/jobAgents/jobs/executions
 * Also covers: none
 * Scenario: swagger-examples/get-job-execution-step
 * provisioning API: SqlServerJobExecution
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b1e7325f0722352d57f2408b35b038e9896844a8/specification/sql/resource-manager/Microsoft.Sql/SQL/examples/2025-01-01/GetJobExecutionStep.json
 * Operation: n/a
 * Runtime baseline: get-job-execution-step.test.baseline.bicep and get-job-execution-step.test.baseline.json
 * Gap/reduction: path and query parameters omitted from the request-body contract
 */

import { SqlServerJobExecution, Job, JobAgent, Server } from "@azure/provisioning-sql";
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
  const job2 = new Job(jobAgent1, {
    name: "agent1",
  });
  const execution3 = new SqlServerJobExecution(job2, {
    name: "getjobexecutionstepe",
  });
  return stack;
}

describe("swagger-examples/get-job-execution-step", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Sql/servers/jobAgents/jobs/executions",
      apiVersion: "2025-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
