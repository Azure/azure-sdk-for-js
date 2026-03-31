// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Radius servers with respective radius secrets from VpnServerConfiguration.
 *
 * @summary list all Radius servers with respective radius secrets from VpnServerConfiguration.
 * x-ms-original-file: 2025-05-01/AllVpnServerConfigurationRadiusServerSecretsList.json
 */
async function listAllVpnServerConfigurationRadiusServerSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnServerConfigurations.listRadiusSecrets("rg1", "vpnserverconfig");
  console.log(result);
}

async function main() {
  await listAllVpnServerConfigurationRadiusServerSecrets();
}

main().catch(console.error);
