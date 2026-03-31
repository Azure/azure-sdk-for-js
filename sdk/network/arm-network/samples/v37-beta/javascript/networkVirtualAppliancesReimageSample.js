// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimages one VM belonging to the specified Network Virtual Appliance.
 *
 * @summary reimages one VM belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSpecificReimage.json
 */
async function reimagesSpecificNetworkVirtualApplianceVMsInVMScaleSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.reimage("rg1", "nva");
  console.log(result);
}

async function main() {
  await reimagesSpecificNetworkVirtualApplianceVMsInVMScaleSet();
}

main().catch(console.error);
