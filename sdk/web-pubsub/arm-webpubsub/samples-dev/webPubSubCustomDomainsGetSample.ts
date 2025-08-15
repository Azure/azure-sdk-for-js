// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a custom domain.
 *
 * @summary Get a custom domain.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubCustomDomains_Get.json
 */
async function webPubSubCustomDomainsGet(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const name = "example";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomDomains.get(resourceGroupName, resourceName, name);
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCustomDomainsGet();
}

main().catch(console.error);
