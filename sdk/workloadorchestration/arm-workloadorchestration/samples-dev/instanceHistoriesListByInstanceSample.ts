// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list InstanceHistory Resources
 *
 * @summary list InstanceHistory Resources
 * x-ms-original-file: 2025-06-01/InstanceHistories_ListByInstance_MaximumSet_Gen.json
 */
async function instanceHistoriesListByInstanceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instanceHistories.listByInstance(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await instanceHistoriesListByInstanceMaximumSet();
}

main().catch(console.error);
