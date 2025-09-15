// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists recent events for the specified webhook.
 *
 * @summary lists recent events for the specified webhook.
 * x-ms-original-file: 2025-05-01-preview/WebhookListEvents.json
 */
async function webhookListEvents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webhooks.listEvents(
    "myResourceGroup",
    "myRegistry",
    "myWebhook",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await webhookListEvents();
}

main().catch(console.error);
