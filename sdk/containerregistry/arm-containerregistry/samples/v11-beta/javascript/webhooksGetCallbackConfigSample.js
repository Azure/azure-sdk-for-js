// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the configuration of service URI and custom headers for the webhook.
 *
 * @summary gets the configuration of service URI and custom headers for the webhook.
 * x-ms-original-file: 2025-05-01-preview/WebhookGetCallbackConfig.json
 */
async function webhookGetCallbackConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.webhooks.getCallbackConfig(
    "myResourceGroup",
    "myRegistry",
    "myWebhook",
  );
  console.log(result);
}

async function main() {
  await webhookGetCallbackConfig();
}

main().catch(console.error);
