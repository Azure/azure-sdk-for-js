// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a custom certificate.
 *
 * @summary delete a custom certificate.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Delete.json
 */
async function webPubSubCustomCertificatesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubCustomCertificates.delete(
    "myResourceGroup",
    "myWebPubSubService",
    "myCert",
  );
}

async function main(): Promise<void> {
  await webPubSubCustomCertificatesDelete();
}

main().catch(console.error);
