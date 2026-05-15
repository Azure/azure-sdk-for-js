// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a VpnServerConfiguration.
 *
 * @summary retrieves the details of a VpnServerConfiguration.
 * x-ms-original-file: 2025-05-01/VpnServerConfigurationGet.json
 */
async function vpnServerConfigurationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnServerConfigurations.get("rg1", "vpnServerConfiguration1");
  console.log(result);
}

async function main() {
  await vpnServerConfigurationGet();
}

main().catch(console.error);
