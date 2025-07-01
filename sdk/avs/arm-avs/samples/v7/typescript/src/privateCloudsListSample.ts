// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PrivateCloud resources by resource group
 *
 * @summary list PrivateCloud resources by resource group
 * x-ms-original-file: 2024-09-01/PrivateClouds_List.json
 */
async function privateCloudsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateClouds.list("group1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PrivateCloud resources by resource group
 *
 * @summary list PrivateCloud resources by resource group
 * x-ms-original-file: 2024-09-01/PrivateClouds_List_Stretched.json
 */
async function privateCloudsListStretched(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateClouds.list("group1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateCloudsList();
  await privateCloudsListStretched();
}

main().catch(console.error);
