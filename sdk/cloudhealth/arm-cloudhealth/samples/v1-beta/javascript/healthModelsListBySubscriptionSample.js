// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list HealthModel resources by subscription ID
 *
 * @summary list HealthModel resources by subscription ID
 * x-ms-original-file: 2025-05-01-preview/HealthModels_ListBySubscription.json
 */
async function healthModelsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.healthModels.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await healthModelsListBySubscription();
}

main().catch(console.error);
