// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PrefixListGlobalRulestackResource resources by Tenant
 *
 * @summary list PrefixListGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/PrefixListGlobalRulestack_List_MaximumSet_Gen.json
 */
async function prefixListGlobalRulestackListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.prefixListGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PrefixListGlobalRulestackResource resources by Tenant
 *
 * @summary list PrefixListGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/PrefixListGlobalRulestack_List_MinimumSet_Gen.json
 */
async function prefixListGlobalRulestackListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.prefixListGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await prefixListGlobalRulestackListMaximumSetGen();
  await prefixListGlobalRulestackListMinimumSetGen();
}

main().catch(console.error);
