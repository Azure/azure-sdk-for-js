// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PreRulesResource resources by Tenant
 *
 * @summary list PreRulesResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/PreRules_List_MaximumSet_Gen.json
 */
async function preRulesListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.preRules.list("lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PreRulesResource resources by Tenant
 *
 * @summary list PreRulesResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/PreRules_List_MinimumSet_Gen.json
 */
async function preRulesListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.preRules.list("lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await preRulesListMaximumSetGen();
  await preRulesListMinimumSetGen();
}

main().catch(console.error);
