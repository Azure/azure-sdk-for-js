// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists recent events for the specified webhook.
 *
 * @summary lists recent events for the specified webhook.
 * x-ms-original-file: 2025-05-01-preview/WebhookListEvents.json
 */
async function webhookListEvents() {
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

async function main() {
  await webhookListEvents();
}

main().catch(console.error);
