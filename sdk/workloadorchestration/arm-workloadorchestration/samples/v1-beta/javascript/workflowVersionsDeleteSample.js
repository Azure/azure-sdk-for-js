// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Workflow Version Resource
 *
 * @summary delete a Workflow Version Resource
 * x-ms-original-file: 2026-05-01-preview/WorkflowVersions_Delete_MaximumSet_Gen.json
 */
async function workflowVersionsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.workflowVersions.delete("rgconfigurationmanager", "testname", "testname", "abcde");
}

async function main() {
  await workflowVersionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
