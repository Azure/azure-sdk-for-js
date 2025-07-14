// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list StandbyVirtualMachinePoolResource resources by resource group
 *
 * @summary list StandbyVirtualMachinePoolResource resources by resource group
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_ListByResourceGroup.json
 */
async function standbyVirtualMachinePoolsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.standbyVirtualMachinePools.listByResourceGroup("rgstandbypool")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await standbyVirtualMachinePoolsListByResourceGroup();
}

main().catch(console.error);
