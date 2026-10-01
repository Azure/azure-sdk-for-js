// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the private link resources that need to be created for a resource.
 *
 * @summary get the private link resources that need to be created for a resource.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateLinkResources_List.json
 */
async function webPubSubPrivateLinkResourcesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webPubSubPrivateLinkResources.list(
    "myResourceGroup",
    "myWebPubSubService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await webPubSubPrivateLinkResourcesList();
}

main().catch(console.error);
