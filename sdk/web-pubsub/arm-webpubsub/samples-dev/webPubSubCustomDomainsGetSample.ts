// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a custom domain.
 *
 * @summary get a custom domain.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Get.json
 */
async function webPubSubCustomDomainsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomDomains.get(
    "myResourceGroup",
    "myWebPubSubService",
    "example",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCustomDomainsGet();
}

main().catch(console.error);
