// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PreRulesGetCountersOptionalParams,
  PaloAltoNetworksCloudngfw,
} from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get counters
 *
 * @summary Get counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PreRules_getCounters_MaximumSet_Gen.json
 */
async function preRulesGetCountersMaximumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const firewallName = "firewall1";
  const options: PreRulesGetCountersOptionalParams = { firewallName };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.getCounters(
    globalRulestackName,
    priority,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get counters
 *
 * @summary Get counters
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PreRules_getCounters_MinimumSet_Gen.json
 */
async function preRulesGetCountersMinimumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.getCounters(
    globalRulestackName,
    priority,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await preRulesGetCountersMaximumSetGen();
  await preRulesGetCountersMinimumSetGen();
}

main().catch(console.error);
