// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Workflow Version Resources
 *
 * @summary list Workflow Version Resources
 * x-ms-original-file: 2025-06-01/WorkflowVersions_ListByWorkflow_MaximumSet_Gen.json
 */
async function workflowVersionsListByWorkflowMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowVersions.listByWorkflow(
    "rgconfigurationmanager",
    "testname",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workflowVersionsListByWorkflowMaximumSet();
}

main().catch(console.error);
