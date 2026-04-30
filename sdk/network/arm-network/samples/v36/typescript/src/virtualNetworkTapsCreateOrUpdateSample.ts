// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualNetworkTap} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Virtual Network Tap.
 *
 * @summary Creates or updates a Virtual Network Tap.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkTapCreate.json
 */
async function createVirtualNetworkTap(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const tapName = "test-vtap";
  const parameters: VirtualNetworkTap = {
    destinationNetworkInterfaceIPConfiguration: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/testNetworkInterface/ipConfigurations/ipconfig1",
    },
    location: "centraluseuap",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkTaps.beginCreateOrUpdateAndWait(
    resourceGroupName,
    tapName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkTap();
}

main().catch(console.error);
