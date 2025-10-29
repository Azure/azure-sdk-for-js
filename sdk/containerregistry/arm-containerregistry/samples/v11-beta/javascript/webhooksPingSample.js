// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers a ping event to be sent to the webhook.
 *
 * @summary triggers a ping event to be sent to the webhook.
 * x-ms-original-file: 2025-06-01-preview/WebhookPing.json
 */
async function webhookPing() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.webhooks.ping("myResourceGroup", "myRegistry", "myWebhook");
  console.log(result);
}

async function main() {
  await webhookPing();
}

main().catch(console.error);
