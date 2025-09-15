// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Target Resource
 *
 * @summary delete a Target Resource
 * x-ms-original-file: 2025-06-01/Targets_Delete_MaximumSet_Gen.json
 */
async function targetsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.targets.delete("rgconfigurationmanager", "testname", {
    forceDelete: true,
  });
}

async function main(): Promise<void> {
  await targetsDeleteMaximumSet();
}

main().catch(console.error);
