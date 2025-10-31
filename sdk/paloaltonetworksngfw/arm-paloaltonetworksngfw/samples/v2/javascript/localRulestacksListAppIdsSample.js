// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of AppIds for LocalRulestack ApiVersion
 *
 * @summary list of AppIds for LocalRulestack ApiVersion
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listAppIds_MaximumSet_Gen.json
 */
async function localRulestacksListAppIdsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listAppIds("rgopenapi", "lrs1", {
    appIdVersion: "8543",
    appPrefix: "pref",
    skip: "a6a321",
    top: 20,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of AppIds for LocalRulestack ApiVersion
 *
 * @summary list of AppIds for LocalRulestack ApiVersion
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listAppIds_MinimumSet_Gen.json
 */
async function localRulestacksListAppIdsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listAppIds("rgopenapi", "lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await localRulestacksListAppIdsMaximumSetGen();
  await localRulestacksListAppIdsMinimumSetGen();
}

main().catch(console.error);
