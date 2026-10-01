// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a hub setting.
 *
 * @summary get a hub setting.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_Get.json
 */
async function webPubSubHubsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubHubs.get(
    "exampleHub",
    "myResourceGroup",
    "myWebPubSubService",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubHubsGet();
}

main().catch(console.error);
