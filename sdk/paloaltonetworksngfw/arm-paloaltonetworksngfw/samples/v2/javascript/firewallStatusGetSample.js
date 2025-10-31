// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a FirewallStatusResource
 *
 * @summary get a FirewallStatusResource
 * x-ms-original-file: 2025-10-08/FirewallStatus_Get_MaximumSet_Gen.json
 */
async function firewallStatusGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewallStatus.get("rgopenapi", "firewall1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FirewallStatusResource
 *
 * @summary get a FirewallStatusResource
 * x-ms-original-file: 2025-10-08/FirewallStatus_Get_MinimumSet_Gen.json
 */
async function firewallStatusGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewallStatus.get("rgopenapi", "firewall1");
  console.log(result);
}

async function main() {
  await firewallStatusGetMaximumSetGen();
  await firewallStatusGetMinimumSetGen();
}

main().catch(console.error);
