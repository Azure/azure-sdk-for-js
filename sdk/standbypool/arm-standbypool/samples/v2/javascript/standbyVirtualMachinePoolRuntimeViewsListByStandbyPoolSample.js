// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource
 *
 * @summary list StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePoolRuntimeViews_ListByStandbyPool.json
 */
async function standbyVirtualMachinePoolRuntimeViewsListByStandbyPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.standbyVirtualMachinePoolRuntimeViews.listByStandbyPool(
    "rgstandbypool",
    "pool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await standbyVirtualMachinePoolRuntimeViewsListByStandbyPool();
}

main().catch(console.error);
