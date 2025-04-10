/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List PostRulesResource resources by Tenant
 *
 * @summary List PostRulesResource resources by Tenant
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PostRules_List_MaximumSet_Gen.json
 */
async function postRulesListMaximumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (let item of client.postRules.list(globalRulestackName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List PostRulesResource resources by Tenant
 *
 * @summary List PostRulesResource resources by Tenant
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/PostRules_List_MinimumSet_Gen.json
 */
async function postRulesListMinimumSetGen(): Promise<void> {
  const globalRulestackName = "lrs1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (let item of client.postRules.list(globalRulestackName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  postRulesListMaximumSetGen();
  postRulesListMinimumSetGen();
}

main().catch(console.error);
