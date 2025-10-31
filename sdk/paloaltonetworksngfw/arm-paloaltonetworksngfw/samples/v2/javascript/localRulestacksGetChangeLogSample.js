// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get changelog
 *
 * @summary get changelog
 * x-ms-original-file: 2025-10-08/LocalRulestacks_getChangeLog_MaximumSet_Gen.json
 */
async function localRulestacksGetChangeLogMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.getChangeLog("rgopenapi", "lrs1");
  console.log(result);
}

/**
 * This sample demonstrates how to get changelog
 *
 * @summary get changelog
 * x-ms-original-file: 2025-10-08/LocalRulestacks_getChangeLog_MinimumSet_Gen.json
 */
async function localRulestacksGetChangeLogMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.getChangeLog("rgopenapi", "lrs1");
  console.log(result);
}

async function main() {
  await localRulestacksGetChangeLogMaximumSetGen();
  await localRulestacksGetChangeLogMinimumSetGen();
}

main().catch(console.error);
