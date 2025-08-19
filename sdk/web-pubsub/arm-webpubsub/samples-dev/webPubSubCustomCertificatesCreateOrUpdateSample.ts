// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a custom certificate.
 *
 * @summary Create or update a custom certificate.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubCustomCertificates_CreateOrUpdate.json
 */

import type { CustomCertificate } from "@azure/arm-webpubsub";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubCustomCertificatesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const certificateName = "myCert";
  const parameters: CustomCertificate = {
    keyVaultBaseUri: "https://myvault.keyvault.azure.net/",
    keyVaultSecretName: "mycert",
    keyVaultSecretVersion: "bb6a44b2743f47f68dad0d6cc9756432",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomCertificates.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    certificateName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCustomCertificatesCreateOrUpdate();
}

main().catch(console.error);
