// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PrivateCloud resources by subscription ID
 *
 * @summary list PrivateCloud resources by subscription ID
 * x-ms-original-file: 2025-09-01/PrivateClouds_ListInSubscription.json
 */
async function privateCloudsListInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateClouds.listInSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PrivateCloud resources by subscription ID
 *
 * @summary list PrivateCloud resources by subscription ID
 * x-ms-original-file: 2025-09-01/PrivateClouds_ListInSubscription_Stretched.json
 */
async function privateCloudsListInSubscriptionStretched() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateClouds.listInSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateCloudsListInSubscription();
  await privateCloudsListInSubscriptionStretched();
}

main().catch(console.error);
