// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Azure Firewall.
 *
 * @summary gets the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallGet.json
 */
async function getAzureFirewall() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.get("rg1", "azurefirewall");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Azure Firewall.
 *
 * @summary gets the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallGetWithAdditionalProperties.json
 */
async function getAzureFirewallWithAdditionalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.get("rg1", "azurefirewall");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Azure Firewall.
 *
 * @summary gets the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallGetWithIpGroups.json
 */
async function getAzureFirewallWithIpGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.get("rg1", "azurefirewall");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Azure Firewall.
 *
 * @summary gets the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallGetWithMgmtSubnet.json
 */
async function getAzureFirewallWithManagementSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.get("rg1", "azurefirewall");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified Azure Firewall.
 *
 * @summary gets the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallGetWithZones.json
 */
async function getAzureFirewallWithZones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.get("rg1", "azurefirewall");
  console.log(result);
}

async function main() {
  await getAzureFirewall();
  await getAzureFirewallWithAdditionalProperties();
  await getAzureFirewallWithIpGroups();
  await getAzureFirewallWithManagementSubnet();
  await getAzureFirewallWithZones();
}

main().catch(console.error);
