// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reset counters
 *
 * @summary reset counters
 * x-ms-original-file: 2026-05-11-preview/PostRules_resetCounters_MaximumSet_Gen.json
 */
async function postRulesResetCountersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.resetCounters("lrs1", "1", { firewallName: "firewall1" });
  console.log(result);
}

/**
 * This sample demonstrates how to reset counters
 *
 * @summary reset counters
 * x-ms-original-file: 2026-05-11-preview/PostRules_resetCounters_MinimumSet_Gen.json
 */
async function postRulesResetCountersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.resetCounters("lrs1", "1");
  console.log(result);
}

async function main() {
  await postRulesResetCountersMaximumSetGen();
  await postRulesResetCountersMinimumSetGen();
}

main().catch(console.error);
