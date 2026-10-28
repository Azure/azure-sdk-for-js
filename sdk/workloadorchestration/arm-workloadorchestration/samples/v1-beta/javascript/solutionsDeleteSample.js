// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Solution Resource
 *
 * @summary delete a Solution Resource
 * x-ms-original-file: 2026-05-01-preview/Solutions_Delete_MaximumSet_Gen.json
 */
async function solutionsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutions.delete("rgconfigurationmanager", "testname", "testname");
}

async function main() {
  await solutionsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
