// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get InstanceHistory Resource
 *
 * @summary get InstanceHistory Resource
 * x-ms-original-file: 2025-06-01/InstanceHistories_Get_MaximumSet_Gen.json
 */
async function instanceHistoriesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.instanceHistories.get(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    "testname",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await instanceHistoriesGetMaximumSet();
}

main().catch(console.error);
