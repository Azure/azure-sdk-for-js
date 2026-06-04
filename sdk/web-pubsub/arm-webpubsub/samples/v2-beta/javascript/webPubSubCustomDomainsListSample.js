// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all custom domains.
 *
 * @summary list all custom domains.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_List.json
 */
async function webPubSubCustomDomainsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webPubSubCustomDomains.list(
    "myResourceGroup",
    "myWebPubSubService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await webPubSubCustomDomainsList();
}

main().catch(console.error);
