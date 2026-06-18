// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get counters
 *
 * @summary get counters
 * x-ms-original-file: 2026-05-11-preview/PreRules_getCounters_MaximumSet_Gen.json
 */
async function preRulesGetCountersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.getCounters("lrs1", "1", { firewallName: "firewall1" });
  console.log(result);
}

/**
 * This sample demonstrates how to get counters
 *
 * @summary get counters
 * x-ms-original-file: 2026-05-11-preview/PreRules_getCounters_MinimumSet_Gen.json
 */
async function preRulesGetCountersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.getCounters("lrs1", "1");
  console.log(result);
}

async function main() {
  await preRulesGetCountersMaximumSetGen();
  await preRulesGetCountersMinimumSetGen();
}

main().catch(console.error);
