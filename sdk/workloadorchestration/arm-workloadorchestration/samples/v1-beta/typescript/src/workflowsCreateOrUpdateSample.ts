// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Workflow resource
 *
 * @summary create or update a Workflow resource
 * x-ms-original-file: 2025-06-01/Workflows_CreateOrUpdate_MaximumSet_Gen.json
 */
async function workflowsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflows.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    {
      properties: {},
      extendedLocation: { name: "szjrwimeqyiue", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workflowsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
