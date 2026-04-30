// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
 *
 * @summary Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ConfigurationPolicyGroupListByVpnServerConfiguration.json
 */
async function configurationPolicyGroupListByVpnServerConfiguration() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationPolicyGroups.listByVpnServerConfiguration(
    resourceGroupName,
    vpnServerConfigurationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await configurationPolicyGroupListByVpnServerConfiguration();
}

main().catch(console.error);
