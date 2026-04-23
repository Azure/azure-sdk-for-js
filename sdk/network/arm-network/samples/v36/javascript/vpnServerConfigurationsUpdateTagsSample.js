// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates VpnServerConfiguration tags.
 *
 * @summary Updates VpnServerConfiguration tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnServerConfigurationUpdateTags.json
 */
async function vpnServerConfigurationUpdate() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const vpnServerConfigurationParameters = {
    tags: { key1: "value1", key2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnServerConfigurations.updateTags(
    resourceGroupName,
    vpnServerConfigurationName,
    vpnServerConfigurationParameters,
  );
  console.log(result);
}

async function main() {
  await vpnServerConfigurationUpdate();
}

main().catch(console.error);
