// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Refresh counters
 *
 * @summary Refresh counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PreRules_refreshCounters_MaximumSet_Gen.json
 */

import type { PreRulesRefreshCountersOptionalParams } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function preRulesRefreshCountersMaximumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const firewallName = "firewall1";
  const options: PreRulesRefreshCountersOptionalParams = { firewallName };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.refreshCounters(globalRulestackName, priority, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Refresh counters
 *
 * @summary Refresh counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PreRules_refreshCounters_MinimumSet_Gen.json
 */
async function preRulesRefreshCountersMinimumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.refreshCounters(globalRulestackName, priority);
  console.log(result);
}

async function main(): Promise<void> {
  await preRulesRefreshCountersMaximumSetGen();
  await preRulesRefreshCountersMinimumSetGen();
}

main().catch(console.error);
