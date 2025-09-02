// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Workflow resource
 *
 * @summary get a Workflow resource
 * x-ms-original-file: 2025-06-01/Workflows_Get_MaximumSet_Gen.json
 */
async function workflowsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.workflows.get("rgconfigurationmanager", "testname", "testname");
  console.log(result);
}

async function main(): Promise<void> {
  await workflowsGetMaximumSet();
}

main().catch(console.error);
