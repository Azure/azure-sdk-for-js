// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PostRulesResource resources by Tenant
 *
 * @summary list PostRulesResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/PostRules_List_MaximumSet_Gen.json
 */
async function postRulesListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
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
 * x-ms-original-file: 2026-05-11-preview/PostRules_List_MinimumSet_Gen.json
 */
async function postRulesListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.postRules.list("lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await postRulesListMaximumSetGen();
  await postRulesListMinimumSetGen();
}

main().catch(console.error);
