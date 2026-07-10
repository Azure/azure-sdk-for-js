// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list HealthModel resources by resource group
 *
 * @summary list HealthModel resources by resource group
 * x-ms-original-file: 2026-05-01-preview/HealthModels_ListByResourceGroup.json
 */
async function healthModelsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.healthModels.listByResourceGroup("online-store-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await healthModelsListByResourceGroup();
}

main().catch(console.error);
