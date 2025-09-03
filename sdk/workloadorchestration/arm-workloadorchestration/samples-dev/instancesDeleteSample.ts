// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Instance Resource
 *
 * @summary delete Instance Resource
 * x-ms-original-file: 2025-06-01/Instances_Delete_MaximumSet_Gen.json
 */
async function instancesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.instances.delete("rgconfigurationmanager", "testname", "testname", "testname");
}

async function main(): Promise<void> {
  await instancesDeleteMaximumSet();
}

main().catch(console.error);
