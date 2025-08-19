// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Refresh counters
 *
 * @summary Refresh counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PostRules_refreshCounters_MaximumSet_Gen.json
 */

import type { PostRulesRefreshCountersOptionalParams } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function postRulesRefreshCountersMaximumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const firewallName = "firewall1";
  const options: PostRulesRefreshCountersOptionalParams = { firewallName };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.refreshCounters(globalRulestackName, priority, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Refresh counters
 *
 * @summary Refresh counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PostRules_refreshCounters_MinimumSet_Gen.json
 */
async function postRulesRefreshCountersMinimumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.refreshCounters(globalRulestackName, priority);
  console.log(result);
}

async function main(): Promise<void> {
  await postRulesRefreshCountersMaximumSetGen();
  await postRulesRefreshCountersMinimumSetGen();
}

main().catch(console.error);
