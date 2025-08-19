// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a custom certificate.
 *
 * @summary Delete a custom certificate.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSubCustomCertificates_Delete.json
 */

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubCustomCertificatesDelete(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WEB-PUBSUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myWebPubSubService";
  const certificateName = "myCert";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomCertificates.delete(
    resourceGroupName,
    resourceName,
    certificateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCustomCertificatesDelete();
}

main().catch(console.error);
