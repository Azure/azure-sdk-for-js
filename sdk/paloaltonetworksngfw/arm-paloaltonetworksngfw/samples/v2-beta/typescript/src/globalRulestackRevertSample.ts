// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revert rulestack configuration
 *
 * @summary revert rulestack configuration
 * x-ms-original-file: 2025-10-08/GlobalRulestack_revert_MaximumSet_Gen.json
 */
async function globalRulestackRevertMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.globalRulestack.revert("praval");
}

/**
 * This sample demonstrates how to revert rulestack configuration
 *
 * @summary revert rulestack configuration
 * x-ms-original-file: 2025-10-08/GlobalRulestack_revert_MinimumSet_Gen.json
 */
async function globalRulestackRevertMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.globalRulestack.revert("praval");
}

async function main(): Promise<void> {
  await globalRulestackRevertMaximumSetGen();
  await globalRulestackRevertMinimumSetGen();
}

main().catch(console.error);
