// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list HealthModel resources by resource group
 *
 * @summary list HealthModel resources by resource group
 * x-ms-original-file: 2026-05-01-preview/HealthModels_ListByResourceGroup.json
 */
async function healthModelsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.healthModels.listByResourceGroup("online-store-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await healthModelsListByResourceGroup();
}

main().catch(console.error);
