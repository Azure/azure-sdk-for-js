// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the shared key of VpnLink connection specified.
 *
 * @summary Gets the shared key of VpnLink connection specified.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VpnSiteLinkConnectionDefaultSharedKeyGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vpnSiteLinkConnectionDefaultSharedKeyGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const connectionName = "vpnConnection1";
  const linkConnectionName = "Connection-Link1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnLinkConnections.getDefaultSharedKey(
    resourceGroupName,
    gatewayName,
    connectionName,
    linkConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await vpnSiteLinkConnectionDefaultSharedKeyGet();
}

main().catch(console.error);
