// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the specified Azure Firewall.
 *
 * @summary Gets the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallGet.json
 */
async function getAzureFirewall() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .get(options);
  console.log(result);
}

getAzureFirewall().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified Azure Firewall.
 *
 * @summary Gets the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallGetWithAdditionalProperties.json
 */
async function getAzureFirewallWithAdditionalProperties() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .get(options);
  console.log(result);
}

getAzureFirewallWithAdditionalProperties().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified Azure Firewall.
 *
 * @summary Gets the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallGetWithIpGroups.json
 */
async function getAzureFirewallWithIPGroups() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .get(options);
  console.log(result);
}

getAzureFirewallWithIPGroups().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified Azure Firewall.
 *
 * @summary Gets the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallGetWithZones.json
 */
async function getAzureFirewallWithZones() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .get(options);
  console.log(result);
}

getAzureFirewallWithZones().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified Azure Firewall.
 *
 * @summary Gets the specified Azure Firewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/AzureFirewallGetWithMgmtSubnet.json
 */
async function getAzureFirewallWithManagementSubnet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const azureFirewallName = "azurefirewall";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}",
      subscriptionId,
      resourceGroupName,
      azureFirewallName
    )
    .get(options);
  console.log(result);
}

getAzureFirewallWithManagementSubnet().catch(console.error);
