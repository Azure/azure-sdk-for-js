// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all route tables applied to a network interface.
 *
 * @summary Gets all route tables applied to a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkInterfaceEffectiveRouteTableList.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function showNetworkInterfaceEffectiveRouteTables(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkInterfaceName = "nic1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkInterfaces.beginGetEffectiveRouteTableAndWait(
      resourceGroupName,
      networkInterfaceName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await showNetworkInterfaceEffectiveRouteTables();
}

main().catch(console.error);
