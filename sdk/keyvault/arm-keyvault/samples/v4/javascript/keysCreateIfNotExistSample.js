// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys.
 *
 * @summary creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys.
 * x-ms-original-file: 2025-05-01/createKey.json
 */
async function createAKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.keys.createIfNotExist(
    "sample-group",
    "sample-vault-name",
    "sample-key-name",
    { properties: { kty: "RSA" } },
  );
  console.log(result);
}

async function main() {
  await createAKey();
}

main().catch(console.error);
