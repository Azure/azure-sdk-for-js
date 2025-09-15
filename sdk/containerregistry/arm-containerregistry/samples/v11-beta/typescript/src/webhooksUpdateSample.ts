// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a webhook with the specified parameters.
 *
 * @summary updates a webhook with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/WebhookUpdate.json
 */
async function webhookUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.webhooks.update("myResourceGroup", "myRegistry", "myWebhook", {
    properties: {
      actions: ["push"],
      customHeaders: { Authorization: "******" },
      scope: "myRepository",
      serviceUri: "http://myservice.com",
      status: "enabled",
    },
    tags: { key: "value" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await webhookUpdate();
}

main().catch(console.error);
