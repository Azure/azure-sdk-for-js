// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove Solution Template Version Resource
 *
 * @summary remove Solution Template Version Resource
 * x-ms-original-file: 2025-06-01/SolutionTemplates_RemoveVersion_MaximumSet_Gen.json
 */
async function solutionTemplatesRemoveVersionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.solutionTemplates.removeVersion("rgconfigurationmanager", "testname", {
    version: "ghtvdzgmzncaifrnuumg",
  });
}

async function main(): Promise<void> {
  await solutionTemplatesRemoveVersionMaximumSet();
}

main().catch(console.error);
