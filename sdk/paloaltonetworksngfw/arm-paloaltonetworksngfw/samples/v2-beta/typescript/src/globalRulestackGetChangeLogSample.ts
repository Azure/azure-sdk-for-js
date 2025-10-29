// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get changelog
 *
 * @summary get changelog
 * x-ms-original-file: 2025-10-08/GlobalRulestack_getChangeLog_MaximumSet_Gen.json
 */
async function globalRulestackGetChangeLogMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.getChangeLog("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to get changelog
 *
 * @summary get changelog
 * x-ms-original-file: 2025-10-08/GlobalRulestack_getChangeLog_MinimumSet_Gen.json
 */
async function globalRulestackGetChangeLogMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.getChangeLog("praval");
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackGetChangeLogMaximumSetGen();
  await globalRulestackGetChangeLogMinimumSetGen();
}

main().catch(console.error);
