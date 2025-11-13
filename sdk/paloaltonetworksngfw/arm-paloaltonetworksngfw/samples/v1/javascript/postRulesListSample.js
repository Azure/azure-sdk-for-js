// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List PostRulesResource resources by Tenant
 *
 * @summary List PostRulesResource resources by Tenant
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PostRules_List_MaximumSet_Gen.json
 */
async function postRulesListMaximumSetGen() {
  const globalRulestackName = "lrs1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.postRules.list(globalRulestackName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List PostRulesResource resources by Tenant
 *
 * @summary List PostRulesResource resources by Tenant
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PostRules_List_MinimumSet_Gen.json
 */
async function postRulesListMinimumSetGen() {
  const globalRulestackName = "lrs1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.postRules.list(globalRulestackName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await postRulesListMaximumSetGen();
  await postRulesListMinimumSetGen();
}

main().catch(console.error);
