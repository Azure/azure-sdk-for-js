// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of Firewalls associated with Rulestack
 *
 * @summary list of Firewalls associated with Rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listFirewalls_MaximumSet_Gen.json
 */
async function localRulestacksListFirewallsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.listFirewalls("rgopenapi", "lrs1");
  console.log(result);
}

/**
 * This sample demonstrates how to list of Firewalls associated with Rulestack
 *
 * @summary list of Firewalls associated with Rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listFirewalls_MinimumSet_Gen.json
 */
async function localRulestacksListFirewallsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.listFirewalls("rgopenapi", "lrs1");
  console.log(result);
}

async function main(): Promise<void> {
  await localRulestacksListFirewallsMaximumSetGen();
  await localRulestacksListFirewallsMinimumSetGen();
}

main().catch(console.error);
