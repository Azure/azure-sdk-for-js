// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PrivateCloud resources by resource group
 *
 * @summary list PrivateCloud resources by resource group
 * x-ms-original-file: 2025-09-01/PrivateClouds_List.json
 */
async function privateCloudsList() {
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
 * x-ms-original-file: 2025-09-01/PrivateClouds_List_Stretched.json
 */
async function privateCloudsListStretched() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateClouds.list("group1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateCloudsList();
  await privateCloudsListStretched();
}

main().catch(console.error);
