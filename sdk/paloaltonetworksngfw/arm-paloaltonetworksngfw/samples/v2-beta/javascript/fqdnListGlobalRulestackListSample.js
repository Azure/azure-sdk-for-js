// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FqdnListGlobalRulestackResource resources by Tenant
 *
 * @summary list FqdnListGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_List_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackListMaximumSetGen() {
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
async function fqdnListGlobalRulestackListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.fqdnListGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fqdnListGlobalRulestackListMaximumSetGen();
  await fqdnListGlobalRulestackListMinimumSetGen();
}

main().catch(console.error);
