// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Solution Version Resource
 *
 * @summary delete a Solution Version Resource
 * x-ms-original-file: 2025-06-01/SolutionVersions_Delete_MaximumSet_Gen.json
 */
async function solutionVersionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionVersions.delete(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
  );
}

async function main() {
  await solutionVersionsDeleteMaximumSet();
}

main().catch(console.error);
