// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Workflow resource
 *
 * @summary delete a Workflow resource
 * x-ms-original-file: 2026-05-01-preview/Workflows_Delete_MaximumSet_Gen.json
 */
async function workflowsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.workflows.delete("rgconfigurationmanager", "testname", "testname");
}

async function main() {
  await workflowsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
