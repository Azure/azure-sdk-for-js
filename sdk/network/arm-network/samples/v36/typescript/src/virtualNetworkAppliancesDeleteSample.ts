// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified virtual network appliance.
 *
 * @summary Deletes the specified virtual network appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkAppliances_Delete.json
 */
async function deleteVirtualNetworkAppliance(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkApplianceName = "test-vna";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.beginDeleteAndWait(
    resourceGroupName,
    virtualNetworkApplianceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteVirtualNetworkAppliance();
}

main().catch(console.error);
