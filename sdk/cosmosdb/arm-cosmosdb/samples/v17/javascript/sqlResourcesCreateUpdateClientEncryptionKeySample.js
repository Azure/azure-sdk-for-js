// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly).
 *
 * @summary create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly).
 * x-ms-original-file: 2026-03-15/CosmosDBSqlClientEncryptionKeyCreateUpdate.json
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
        id: "cekName",
        encryptionAlgorithm: "AEAD_AES_256_CBC_HMAC_SHA256",
        wrappedDataEncryptionKey: Buffer.from("U3dhZ2dlciByb2Nrcw==", "base64"),
        keyWrapMetadata: {
          name: "customerManagedKey",
          type: "AzureKeyVault",
          value: "AzureKeyVault Key URL",
          algorithm: "RSA-OAEP",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBClientEncryptionKeyCreateUpdate();
}

main().catch(console.error);
