// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Workflow Version Resource
 *
 * @summary delete a Workflow Version Resource
 * x-ms-original-file: 2025-06-01/WorkflowVersions_Delete_MaximumSet_Gen.json
 */
async function workflowVersionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.workflowVersions.delete(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
  );
}

async function main() {
  await workflowVersionsDeleteMaximumSet();
}

main().catch(console.error);
