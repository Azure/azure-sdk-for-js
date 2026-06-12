// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a custom domain.
 *
 * @summary delete a custom domain.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Delete.json
 */
async function webPubSubCustomDomainsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubCustomDomains.delete("myResourceGroup", "myWebPubSubService", "example");
}

async function main(): Promise<void> {
  await webPubSubCustomDomainsDelete();
}

main().catch(console.error);
