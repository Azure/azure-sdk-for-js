// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource
 *
 * @summary list StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2024-03-01/StandbyVirtualMachinePoolRuntimeViews_ListByStandbyPool.json
 */
async function standbyVirtualMachinePoolRuntimeViewsListByStandbyPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.standbyVirtualMachinePoolRuntimeViews.listByStandbyPool(
    "rgstandbypool",
    "pool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  standbyVirtualMachinePoolRuntimeViewsListByStandbyPool();
}

main().catch(console.error);
