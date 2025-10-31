// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a LocalRulestackResource
 *
 * @summary get a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_Get_MaximumSet_Gen.json
 */
async function localRulestacksGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.get("rgopenapi", "lrs1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a LocalRulestackResource
 *
 * @summary get a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_Get_MinimumSet_Gen.json
 */
async function localRulestacksGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.get("rgopenapi", "lrs1");
  console.log(result);
}

async function main() {
  await localRulestacksGetMaximumSetGen();
  await localRulestacksGetMinimumSetGen();
}

main().catch(console.error);
