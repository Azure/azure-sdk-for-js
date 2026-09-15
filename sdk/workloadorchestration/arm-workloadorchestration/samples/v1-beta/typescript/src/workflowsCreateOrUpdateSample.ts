// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Workflow resource
 *
 * @summary create or update a Workflow resource
 * x-ms-original-file: 2026-05-01-preview/Workflows_CreateOrUpdate_MaximumSet_Gen.json
 */
async function workflowsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflows.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    { properties: {}, extendedLocation: { name: "ggfwkwklvvkrmlysvvhcj", type: "EdgeZone" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workflowsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
