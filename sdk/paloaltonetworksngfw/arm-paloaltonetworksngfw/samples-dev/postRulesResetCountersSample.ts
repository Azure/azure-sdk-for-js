// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Reset counters
 *
 * @summary Reset counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PostRules_resetCounters_MaximumSet_Gen.json
 */

import type { PostRulesResetCountersOptionalParams } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function postRulesResetCountersMaximumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const firewallName = "firewall1";
  const options: PostRulesResetCountersOptionalParams = { firewallName };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.resetCounters(globalRulestackName, priority, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Reset counters
 *
 * @summary Reset counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PostRules_resetCounters_MinimumSet_Gen.json
 */
async function postRulesResetCountersMinimumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.postRules.resetCounters(globalRulestackName, priority);
  console.log(result);
}

async function main(): Promise<void> {
  await postRulesResetCountersMaximumSetGen();
  await postRulesResetCountersMinimumSetGen();
}

main().catch(console.error);
