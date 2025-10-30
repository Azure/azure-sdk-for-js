// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FirewallResource
 *
 * @summary get a FirewallResource
 * x-ms-original-file: 2025-10-08/Firewalls_Get_MaximumSet_Gen.json
 */
async function firewallsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.get("firewall-rg", "firewall1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FirewallResource
 *
 * @summary get a FirewallResource
 * x-ms-original-file: 2025-10-08/Firewalls_Get_MinimumSet_Gen.json
 */
async function firewallsGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.get("firewall-rg", "firewall1");
  console.log(result);
}

async function main(): Promise<void> {
  await firewallsGetMaximumSetGen();
  await firewallsGetMinimumSetGen();
}

main().catch(console.error);
