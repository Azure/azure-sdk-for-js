// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list predefined URL categories for rulestack
 *
 * @summary list predefined URL categories for rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listPredefinedUrlCategories_MaximumSet_Gen.json
 */
async function globalRulestackListPredefinedUrlCategoriesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listPredefinedUrlCategories("praval", {
    skip: "a6a321",
    top: 20,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list predefined URL categories for rulestack
 *
 * @summary list predefined URL categories for rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listPredefinedUrlCategories_MinimumSet_Gen.json
 */
async function globalRulestackListPredefinedUrlCategoriesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listPredefinedUrlCategories("praval");
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackListPredefinedUrlCategoriesMaximumSetGen();
  await globalRulestackListPredefinedUrlCategoriesMinimumSetGen();
}

main().catch(console.error);
