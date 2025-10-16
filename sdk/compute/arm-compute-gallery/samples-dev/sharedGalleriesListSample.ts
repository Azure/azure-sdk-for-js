// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list shared galleries by subscription id or tenant id.
 *
 * @summary list shared galleries by subscription id or tenant id.
 * x-ms-original-file: 2024-03-03/sharedGalleryExamples/SharedGallery_List.json
 */
async function listSharedGalleries(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedGalleries.list("myLocation")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSharedGalleries();
}

main().catch(console.error);
