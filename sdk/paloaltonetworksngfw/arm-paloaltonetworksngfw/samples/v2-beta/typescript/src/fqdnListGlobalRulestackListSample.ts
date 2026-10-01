// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FqdnListGlobalRulestackResource resources by Tenant
 *
 * @summary list FqdnListGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_List_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.fqdnListGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FqdnListGlobalRulestackResource resources by Tenant
 *
 * @summary list FqdnListGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_List_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.fqdnListGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fqdnListGlobalRulestackListMaximumSetGen();
  await fqdnListGlobalRulestackListMinimumSetGen();
}

main().catch(console.error);
