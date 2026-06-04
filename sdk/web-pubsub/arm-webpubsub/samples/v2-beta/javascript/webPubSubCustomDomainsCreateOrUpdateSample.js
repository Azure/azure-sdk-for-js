// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a custom domain.
 *
 * @summary create or update a custom domain.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_CreateOrUpdate.json
 */
async function webPubSubCustomDomainsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomDomains.createOrUpdate(
    "myResourceGroup",
    "myWebPubSubService",
    "myDomain",
    {
      customCertificate: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.SignalRService/WebPubSub/myWebPubSubService/customCertificates/myCert",
      },
      domainName: "example.com",
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubCustomDomainsCreateOrUpdate();
}

main().catch(console.error);
