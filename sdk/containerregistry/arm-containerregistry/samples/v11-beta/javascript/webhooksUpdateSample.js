// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a webhook with the specified parameters.
 *
 * @summary updates a webhook with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/WebhookUpdate.json
 */
async function webhookUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.webhooks.update("myResourceGroup", "myRegistry", "myWebhook", {
    tags: { key: "value" },
    properties: {
      serviceUri: "http://myservice.com",
      customHeaders: { Authorization: "******" },
      status: "enabled",
      scope: "myRepository",
      actions: ["push"],
    },
  });
  console.log(result);
}

async function main() {
  await webhookUpdate();
}

main().catch(console.error);
