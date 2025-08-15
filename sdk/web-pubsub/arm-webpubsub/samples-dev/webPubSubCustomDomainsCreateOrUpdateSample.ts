// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomDomain } from "@azure/arm-webpubsub";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a custom domain.
 *
 * @summary Create or update a custom domain.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubCustomDomains_CreateOrUpdate.json
 */
async function webPubSubCustomDomainsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const name = "myDomain";
  const parameters: CustomDomain = {
    customCertificate: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.SignalRService/WebPubSub/myWebPubSubService/customCertificates/myCert",
    },
    domainName: "example.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomDomains.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    name,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCustomDomainsCreateOrUpdate();
}

main().catch(console.error);
