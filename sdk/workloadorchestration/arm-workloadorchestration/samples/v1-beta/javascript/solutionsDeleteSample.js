// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Solution Resource
 *
 * @summary delete a Solution Resource
 * x-ms-original-file: 2025-06-01/Solutions_Delete_MaximumSet_Gen.json
 */
async function solutionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutions.delete("rgconfigurationmanager", "testname", "testname");
}

async function main() {
  await solutionsDeleteMaximumSet();
}

main().catch(console.error);
