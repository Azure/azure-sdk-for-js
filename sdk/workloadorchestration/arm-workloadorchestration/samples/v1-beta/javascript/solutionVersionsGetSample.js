// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Solution Version Resource
 *
 * @summary get a Solution Version Resource
 * x-ms-original-file: 2025-06-01/SolutionVersions_Get_MaximumSet_Gen.json
 */
async function solutionVersionsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionVersions.get(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
  );
  console.log(result);
}

async function main() {
  await solutionVersionsGetMaximumSet();
}

main().catch(console.error);
