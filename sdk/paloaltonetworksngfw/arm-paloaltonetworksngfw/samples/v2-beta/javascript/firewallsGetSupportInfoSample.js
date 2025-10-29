// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to support info for firewall.
 *
 * @summary support info for firewall.
 * x-ms-original-file: 2025-10-08/Firewalls_getSupportInfo_MaximumSet_Gen.json
 */
async function firewallsGetSupportInfoMaximumSetGen() {
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
async function firewallsGetSupportInfoMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getSupportInfo("rgopenapi", "firewall1");
  console.log(result);
}

async function main() {
  await firewallsGetSupportInfoMaximumSetGen();
  await firewallsGetSupportInfoMinimumSetGen();
}

main().catch(console.error);
