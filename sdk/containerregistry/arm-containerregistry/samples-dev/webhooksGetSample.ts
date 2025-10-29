// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified webhook.
 *
 * @summary gets the properties of the specified webhook.
 * x-ms-original-file: 2025-06-01-preview/WebhookGet.json
 */
async function webhookGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.webhooks.get("myResourceGroup", "myRegistry", "myWebhook");
  console.log(result);
}

async function main(): Promise<void> {
  await webhookGet();
}

main().catch(console.error);
