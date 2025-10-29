// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FirewallStatusResource resources by Firewalls
 *
 * @summary list FirewallStatusResource resources by Firewalls
 * x-ms-original-file: 2025-10-08/FirewallStatus_ListByFirewalls_MaximumSet_Gen.json
 */
async function firewallStatusListByFirewallsMaximumSetGen(): Promise<void> {
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
async function firewallStatusListByFirewallsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallStatus.listByFirewalls("rgopenapi", "firewall1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await firewallStatusListByFirewallsMaximumSetGen();
  await firewallStatusListByFirewallsMinimumSetGen();
}

main().catch(console.error);
