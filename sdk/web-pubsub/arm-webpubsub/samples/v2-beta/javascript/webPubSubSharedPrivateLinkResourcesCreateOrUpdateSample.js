// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a shared private link resource
 *
 * @summary create or update a shared private link resource
 * x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_CreateOrUpdate.json
 */
async function webPubSubSharedPrivateLinkResourcesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubSharedPrivateLinkResources.createOrUpdate(
    "upstream",
    "myResourceGroup",
    "myWebPubSubService",
    {
      groupId: "sites",
      privateLinkResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Web/sites/myWebApp",
      requestMessage: "Please approve",
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubSharedPrivateLinkResourcesCreateOrUpdate();
}

main().catch(console.error);
