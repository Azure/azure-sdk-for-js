// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Solution Resource
 *
 * @summary update a Solution Resource
 * x-ms-original-file: 2025-06-01/Solutions_Update_MaximumSet_Gen.json
 */
async function solutionsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutions.update("rgconfigurationmanager", "testname", "testname", {
    properties: {},
  });
  console.log(result);
}

async function main() {
  await solutionsUpdateMaximumSet();
}

main().catch(console.error);
