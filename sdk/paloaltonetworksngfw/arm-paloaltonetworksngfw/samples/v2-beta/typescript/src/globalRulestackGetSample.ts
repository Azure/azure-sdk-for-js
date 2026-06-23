// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a GlobalRulestackResource
 *
 * @summary get a GlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_Get_MaximumSet_Gen.json
 */
async function globalRulestackGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.get("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to get a GlobalRulestackResource
 *
 * @summary get a GlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_Get_MinimumSet_Gen.json
 */
async function globalRulestackGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.get("praval");
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackGetMaximumSetGen();
  await globalRulestackGetMinimumSetGen();
}

main().catch(console.error);
