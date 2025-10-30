// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FirewallResource resources by resource group
 *
 * @summary list FirewallResource resources by resource group
 * x-ms-original-file: 2025-10-08/Firewalls_ListByResourceGroup_MaximumSet_Gen.json
 */
async function firewallsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewalls.listByResourceGroup("firewall-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FirewallResource resources by resource group
 *
 * @summary list FirewallResource resources by resource group
 * x-ms-original-file: 2025-10-08/Firewalls_ListByResourceGroup_MinimumSet_Gen.json
 */
async function firewallsListByResourceGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewalls.listByResourceGroup("firewall-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await firewallsListByResourceGroupMaximumSetGen();
  await firewallsListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
