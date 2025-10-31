// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to support info for firewall.
 *
 * @summary support info for firewall.
 * x-ms-original-file: 2025-10-08/Firewalls_getSupportInfo_MaximumSet_Gen.json
 */
async function firewallsGetSupportInfoMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getSupportInfo("rgopenapi", "firewall1", {
    email: "user1@domain.com",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to support info for firewall.
 *
 * @summary support info for firewall.
 * x-ms-original-file: 2025-10-08/Firewalls_getSupportInfo_MinimumSet_Gen.json
 */
async function firewallsGetSupportInfoMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getSupportInfo("rgopenapi", "firewall1");
  console.log(result);
}

async function main(): Promise<void> {
  await firewallsGetSupportInfoMaximumSetGen();
  await firewallsGetSupportInfoMinimumSetGen();
}

main().catch(console.error);
