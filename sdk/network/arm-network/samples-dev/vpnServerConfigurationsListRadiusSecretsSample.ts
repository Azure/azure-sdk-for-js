// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all Radius servers with respective radius secrets from VpnServerConfiguration.
 *
 * @summary List all Radius servers with respective radius secrets from VpnServerConfiguration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AllVpnServerConfigurationRadiusServerSecretsList.json
 */
async function listAllVpnServerConfigurationRadiusServerSecrets(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "72f988bf-86f1-41af-91ab-2d7cd0dddd4";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnServerConfigurationName = "vpnserverconfig";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnServerConfigurations.listRadiusSecrets(
    resourceGroupName,
    vpnServerConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAllVpnServerConfigurationRadiusServerSecrets();
}

main().catch(console.error);
