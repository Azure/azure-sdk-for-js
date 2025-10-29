// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to support info for rulestack.
 *
 * @summary support info for rulestack.
 * x-ms-original-file: 2025-10-08/LocalRulestacks_getSupportInfo_MaximumSet_Gen.json
 */
async function localRulestacksGetSupportInfoMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.getSupportInfo("rgopenapi", "lrs1", {
    email: "user1@domain.com",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to support info for rulestack.
 *
 * @summary support info for rulestack.
 * x-ms-original-file: 2025-10-08/LocalRulestacks_getSupportInfo_MinimumSet_Gen.json
 */
async function localRulestacksGetSupportInfoMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.getSupportInfo("rgopenapi", "lrs1");
  console.log(result);
}

async function main() {
  await localRulestacksGetSupportInfoMaximumSetGen();
  await localRulestacksGetSupportInfoMinimumSetGen();
}

main().catch(console.error);
