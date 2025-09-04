// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Solution Version Resource
 *
 * @summary update a Solution Version Resource
 * x-ms-original-file: 2025-06-01/SolutionVersions_Update_MaximumSet_Gen.json
 */
async function solutionVersionsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionVersions.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    { properties: { specification: {} } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionVersionsUpdateMaximumSet();
}

main().catch(console.error);
