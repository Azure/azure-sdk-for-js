// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FirewallStatusResource resources by Firewalls
 *
 * @summary list FirewallStatusResource resources by Firewalls
 * x-ms-original-file: 2025-10-08/FirewallStatus_ListByFirewalls_MaximumSet_Gen.json
 */
async function firewallStatusListByFirewallsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallStatus.listByFirewalls("rgopenapi", "firewall1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FirewallStatusResource resources by Firewalls
 *
 * @summary list FirewallStatusResource resources by Firewalls
 * x-ms-original-file: 2025-10-08/FirewallStatus_ListByFirewalls_MinimumSet_Gen.json
 */
async function firewallStatusListByFirewallsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallStatus.listByFirewalls("rgopenapi", "firewall1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await firewallStatusListByFirewallsMaximumSetGen();
  await firewallStatusListByFirewallsMinimumSetGen();
}

main().catch(console.error);
