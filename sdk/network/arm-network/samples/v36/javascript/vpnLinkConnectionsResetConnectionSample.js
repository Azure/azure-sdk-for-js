// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Resets the VpnLink connection specified.
 *
 * @summary Resets the VpnLink connection specified.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnSiteLinkConnectionReset.json
 */
async function resetVpnLinkConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const connectionName = "vpnConnection1";
  const linkConnectionName = "Connection-Link1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnLinkConnections.beginResetConnectionAndWait(
    resourceGroupName,
    gatewayName,
    connectionName,
    linkConnectionName,
  );
  console.log(result);
}

async function main() {
  await resetVpnLinkConnection();
}

main().catch(console.error);
