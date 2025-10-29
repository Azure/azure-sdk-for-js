// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a FirewallResource
 *
 * @summary delete a FirewallResource
 * x-ms-original-file: 2025-10-08/Firewalls_Delete_MaximumSet_Gen.json
 */
async function firewallsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.firewalls.delete("firewall-rg", "firewall1");
}

/**
 * This sample demonstrates how to delete a FirewallResource
 *
 * @summary delete a FirewallResource
 * x-ms-original-file: 2025-10-08/Firewalls_Delete_MinimumSet_Gen.json
 */
async function firewallsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.firewalls.delete("firewall-rg", "firewall1");
}

async function main(): Promise<void> {
  await firewallsDeleteMaximumSetGen();
  await firewallsDeleteMinimumSetGen();
}

main().catch(console.error);
