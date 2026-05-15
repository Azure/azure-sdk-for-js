// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts one or more VMs belonging to the specified Network Virtual Appliance.
 *
 * @summary restarts one or more VMs belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceEmptyRestart.json
 */
async function restartAllNetworkVirtualApplianceVMsInVMScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.restart("rg1", "nva");
  console.log(result);
}

/**
 * This sample demonstrates how to restarts one or more VMs belonging to the specified Network Virtual Appliance.
 *
 * @summary restarts one or more VMs belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceSpecificRestart.json
 */
async function restartSpecificNetworkVirtualApplianceVMsInVMScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.restart("rg1", "nva");
  console.log(result);
}

async function main(): Promise<void> {
  await restartAllNetworkVirtualApplianceVMsInVMScaleSet();
  await restartSpecificNetworkVirtualApplianceVMsInVMScaleSet();
}

main().catch(console.error);
