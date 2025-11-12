// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Reset counters
 *
 * @summary Reset counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PostRules_resetCounters_MaximumSet_Gen.json
 */
async function postRulesResetCountersMaximumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const firewallName = "firewall1";
  const options = { firewallName };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.resetCounters(globalRulestackName, priority, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Reset counters
 *
 * @summary Reset counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PostRules_resetCounters_MinimumSet_Gen.json
 */
async function postRulesResetCountersMinimumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.resetCounters(globalRulestackName, priority);
  console.log(result);
}

async function main() {
  await postRulesResetCountersMaximumSetGen();
  await postRulesResetCountersMinimumSetGen();
}

main().catch(console.error);
