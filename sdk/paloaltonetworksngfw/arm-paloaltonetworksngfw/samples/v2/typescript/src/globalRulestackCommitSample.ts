// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to commit rulestack configuration
 *
 * @summary commit rulestack configuration
 * x-ms-original-file: 2025-10-08/GlobalRulestack_commit_MaximumSet_Gen.json
 */
async function globalRulestackCommitMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.globalRulestack.commit("praval");
}

/**
 * This sample demonstrates how to commit rulestack configuration
 *
 * @summary commit rulestack configuration
 * x-ms-original-file: 2025-10-08/GlobalRulestack_commit_MinimumSet_Gen.json
 */
async function globalRulestackCommitMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.globalRulestack.commit("praval");
}

async function main(): Promise<void> {
  await globalRulestackCommitMaximumSetGen();
  await globalRulestackCommitMinimumSetGen();
}

main().catch(console.error);
