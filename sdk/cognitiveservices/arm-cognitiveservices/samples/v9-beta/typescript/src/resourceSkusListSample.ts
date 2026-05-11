// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 *
 * @summary gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 * x-ms-original-file: 2026-01-15-preview/GetSkus.json
 */
async function regenerateKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f1c637e4-72ec-4f89-8d2b-0f933c036002";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await regenerateKeys();
}

main().catch(console.error);
