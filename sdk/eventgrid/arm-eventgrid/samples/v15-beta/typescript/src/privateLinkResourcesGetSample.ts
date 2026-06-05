// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of a private link resource.
 *
 * @summary get properties of a private link resource.
 * x-ms-original-file: 2025-07-15-preview/PrivateLinkResources_Get.json
 */
async function privateLinkResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "examplerg",
    "topics",
    "exampletopic1",
    "topic",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesGet();
}

main().catch(console.error);
