// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a custom domain.
 *
 * @summary get a custom domain.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Get.json
 */
async function webPubSubCustomDomainsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomDomains.get(
    "myResourceGroup",
    "myWebPubSubService",
    "example",
  );
  console.log(result);
}

async function main() {
  await webPubSubCustomDomainsGet();
}

main().catch(console.error);
