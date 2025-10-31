// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list GlobalRulestackResource resources by Tenant
 *
 * @summary list GlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2025-10-08/GlobalRulestack_List_MaximumSet_Gen.json
 */
async function globalRulestackListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.globalRulestack.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list GlobalRulestackResource resources by Tenant
 *
 * @summary list GlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2025-10-08/GlobalRulestack_List_MinimumSet_Gen.json
 */
async function globalRulestackListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.globalRulestack.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await globalRulestackListMaximumSetGen();
  await globalRulestackListMinimumSetGen();
}

main().catch(console.error);
