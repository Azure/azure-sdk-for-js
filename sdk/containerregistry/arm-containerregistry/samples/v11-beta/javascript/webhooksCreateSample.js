// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a webhook for a container registry with the specified parameters.
 *
 * @summary creates a webhook for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/WebhookCreate.json
 */
async function webhookCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.webhooks.create("myResourceGroup", "myRegistry", "myWebhook", {
    location: "westus",
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
  await webhookCreate();
}

main().catch(console.error);
