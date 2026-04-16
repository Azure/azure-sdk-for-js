// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Refresh counters
 *
 * @summary Refresh counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PostRules_refreshCounters_MaximumSet_Gen.json
 */
async function postRulesRefreshCountersMaximumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const firewallName = "firewall1";
  const options = { firewallName };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.refreshCounters(globalRulestackName, priority, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Refresh counters
 *
 * @summary Refresh counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PostRules_refreshCounters_MinimumSet_Gen.json
 */
async function postRulesRefreshCountersMinimumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.refreshCounters(globalRulestackName, priority);
  console.log(result);
}

async function main() {
  await postRulesRefreshCountersMaximumSetGen();
  await postRulesRefreshCountersMinimumSetGen();
}

main().catch(console.error);
