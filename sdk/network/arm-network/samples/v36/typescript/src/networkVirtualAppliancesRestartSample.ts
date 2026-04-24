// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Restarts one or more VMs belonging to the specified Network Virtual Appliance.
 *
 * @summary Restarts one or more VMs belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceEmptyRestart.json
 */
async function restartAllNetworkVirtualApplianceVMSInVMScaleSet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginRestartAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Restarts one or more VMs belonging to the specified Network Virtual Appliance.
 *
 * @summary Restarts one or more VMs belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceSpecificRestart.json
 */
async function restartSpecificNetworkVirtualApplianceVMSInVMScaleSet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginRestartAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartAllNetworkVirtualApplianceVMSInVMScaleSet();
  await restartSpecificNetworkVirtualApplianceVMSInVMScaleSet();
}

main().catch(console.error);
