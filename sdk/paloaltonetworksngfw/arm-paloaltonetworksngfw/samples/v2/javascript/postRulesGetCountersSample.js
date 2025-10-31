// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get counters
 *
 * @summary get counters
 * x-ms-original-file: 2025-10-08/PostRules_getCounters_MaximumSet_Gen.json
 */
async function postRulesGetCountersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.postRules.getCounters("lrs1", "1", {
    firewallName: "firewall1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get counters
 *
 * @summary get counters
 * x-ms-original-file: 2025-10-08/PostRules_getCounters_MinimumSet_Gen.json
 */
async function postRulesGetCountersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.postRules.getCounters("lrs1", "1");
  console.log(result);
}

async function main() {
  await postRulesGetCountersMaximumSetGen();
  await postRulesGetCountersMinimumSetGen();
}

main().catch(console.error);
