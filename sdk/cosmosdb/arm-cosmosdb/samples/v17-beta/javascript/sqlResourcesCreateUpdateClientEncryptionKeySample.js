// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly).
 *
 * @summary create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly).
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlClientEncryptionKeyCreateUpdate.json
 */
async function cosmosDBClientEncryptionKeyCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateClientEncryptionKey(
    "rgName",
    "accountName",
    "databaseName",
    "cekName",
    {
      resource: {
        encryptionAlgorithm: "AEAD_AES_256_CBC_HMAC_SHA256",
        id: "cekName",
        keyWrapMetadata: {
          name: "customerManagedKey",
          type: "AzureKeyVault",
          algorithm: "RSA-OAEP",
          value: "AzureKeyVault Key URL",
        },
        wrappedDataEncryptionKey: Buffer.from(
          "VGhpcyBpcyBhY3R1YWxseSBhbiBhcnJheSBvZiBieXRlcy4gVGhpcyByZXF1ZXN0L3Jlc3BvbnNlIGlzIGJlaW5nIHByZXNlbnRlZCBhcyBhIHN0cmluZyBmb3IgcmVhZGFiaWxpdHkgaW4gdGhlIGV4YW1wbGU=",
          "base64",
        ),
      },
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBClientEncryptionKeyCreateUpdate();
}

main().catch(console.error);
