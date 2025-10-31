// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PostRulesResource resources by Tenant
 *
 * @summary list PostRulesResource resources by Tenant
 * x-ms-original-file: 2025-10-08/PostRules_List_MaximumSet_Gen.json
 */
async function postRulesListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.postRules.list("lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PostRulesResource resources by Tenant
 *
 * @summary list PostRulesResource resources by Tenant
 * x-ms-original-file: 2025-10-08/PostRules_List_MinimumSet_Gen.json
 */
async function postRulesListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.postRules.list("lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await postRulesListMaximumSetGen();
  await postRulesListMinimumSetGen();
}

main().catch(console.error);
