// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list HealthModel resources by resource group
 *
 * @summary list HealthModel resources by resource group
 * x-ms-original-file: 2025-05-01-preview/HealthModels_ListByResourceGroup.json
 */
async function healthModelsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.healthModels.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await healthModelsListByResourceGroup();
}

main().catch(console.error);
