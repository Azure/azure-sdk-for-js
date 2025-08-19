// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Reimages one VM belonging to the specified Network Virtual Appliance.
 *
 * @summary Reimages one VM belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkVirtualApplianceSpecificReimage.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reimagesSpecificNetworkVirtualApplianceVMSInVMScaleSet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.beginReimageAndWait(
    resourceGroupName,
    networkVirtualApplianceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reimagesSpecificNetworkVirtualApplianceVMSInVMScaleSet();
}

main().catch(console.error);
