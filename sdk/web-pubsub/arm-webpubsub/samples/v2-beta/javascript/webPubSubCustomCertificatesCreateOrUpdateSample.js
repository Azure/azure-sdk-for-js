// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebPubSubManagementClient } = require("@azure/arm-webpubsub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a custom certificate.
 *
 * @summary create or update a custom certificate.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_CreateOrUpdate.json
 */
async function webPubSubCustomCertificatesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubCustomCertificates.createOrUpdate(
    "myResourceGroup",
    "myWebPubSubService",
    "myCert",
    {
      keyVaultBaseUri: "https://myvault.keyvault.azure.net/",
      keyVaultSecretName: "mycert",
      keyVaultSecretVersion: "bb6a44b2743f47f68dad0d6cc9756432",
    },
  );
  console.log(result);
}

async function main() {
  await webPubSubCustomCertificatesCreateOrUpdate();
}

main().catch(console.error);
