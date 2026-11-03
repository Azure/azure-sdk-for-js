// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a custom certificate.
 *
 * @summary get a custom certificate.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Get.json
 */
async function webPubSubCustomCertificatesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomCertificates.get(
    "myResourceGroup",
    "myWebPubSubService",
    "myCert",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCustomCertificatesGet();
}

main().catch(console.error);
