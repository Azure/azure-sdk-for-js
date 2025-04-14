// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgriculturePlatformClient } = require("@azure/arm-agricultureplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AgriServiceResource resources by subscription ID
 *
 * @summary list AgriServiceResource resources by subscription ID
 * x-ms-original-file: 2024-06-01-preview/AgriService_ListBySubscription_MaximumSet_Gen.json
 */
async function agriServiceListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agriService.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await agriServiceListBySubscription();
}

main().catch(console.error);
