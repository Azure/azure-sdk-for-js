// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified network profile in a specified resource group.
 *
 * @summary Gets the specified network profile in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkProfileGetConfigOnly.json
 */
async function getNetworkProfile() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkProfileName = "networkProfile1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkProfiles.get(resourceGroupName, networkProfileName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified network profile in a specified resource group.
 *
 * @summary Gets the specified network profile in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkProfileGetWithContainerNic.json
 */
async function getNetworkProfileWithContainerNetworkInterfaces() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkProfileName = "networkProfile1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkProfiles.get(resourceGroupName, networkProfileName);
  console.log(result);
}

async function main() {
  await getNetworkProfile();
  await getNetworkProfileWithContainerNetworkInterfaces();
}

main().catch(console.error);
