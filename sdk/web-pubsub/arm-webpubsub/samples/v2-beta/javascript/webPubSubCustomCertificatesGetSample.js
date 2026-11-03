// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a custom certificate.
 *
 * @summary get a custom certificate.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Get.json
 */
async function webPubSubCustomCertificatesGet() {
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

async function main() {
  await webPubSubCustomCertificatesGet();
}

main().catch(console.error);
