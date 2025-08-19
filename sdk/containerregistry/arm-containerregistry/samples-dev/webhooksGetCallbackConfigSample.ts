// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the configuration of service URI and custom headers for the webhook.
 *
 * @summary Gets the configuration of service URI and custom headers for the webhook.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/WebhookGetCallbackConfig.json
 */

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webhookGetCallbackConfig(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const webhookName = "myWebhook";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.webhooks.getCallbackConfig(
    resourceGroupName,
    registryName,
    webhookName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webhookGetCallbackConfig();
}

main().catch(console.error);
