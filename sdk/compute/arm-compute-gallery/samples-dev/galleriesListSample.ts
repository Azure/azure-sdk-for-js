// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list galleries under a subscription.
 *
 * @summary list galleries under a subscription.
 * x-ms-original-file: 2024-03-03/galleryExamples/Gallery_ListBySubscription.json
 */
async function listGalleriesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleries.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleriesInASubscription();
}

main().catch(console.error);
