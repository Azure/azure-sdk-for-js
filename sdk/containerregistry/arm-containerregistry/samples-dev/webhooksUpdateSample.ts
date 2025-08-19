// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a webhook with the specified parameters.
 *
 * @summary Updates a webhook with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/WebhookUpdate.json
 */

import {
  WebhookUpdateParameters,
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webhookUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const webhookName = "myWebhook";
  const webhookUpdateParameters: WebhookUpdateParameters = {
    actions: ["push"],
    customHeaders: { authorization: "******" },
    scope: "myRepository",
    serviceUri: "http://myservice.com",
    status: "enabled",
    tags: { key: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.webhooks.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    webhookName,
    webhookUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webhookUpdate();
}

main().catch(console.error);
