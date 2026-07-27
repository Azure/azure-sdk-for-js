// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PrefixListGlobalRulestackResource resources by Tenant
 *
 * @summary list PrefixListGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/PrefixListGlobalRulestack_List_MaximumSet_Gen.json
 */
async function prefixListGlobalRulestackListMaximumSetGen() {
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
async function prefixListGlobalRulestackListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.prefixListGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await prefixListGlobalRulestackListMaximumSetGen();
  await prefixListGlobalRulestackListMinimumSetGen();
}

main().catch(console.error);
