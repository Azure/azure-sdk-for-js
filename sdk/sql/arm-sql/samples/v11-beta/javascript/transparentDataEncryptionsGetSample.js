// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a logical database's transparent data encryption.
 *
 * @summary gets a logical database's transparent data encryption.
 * x-ms-original-file: 2025-02-01-preview/TransparentDataEncryptionGet.json
 */
async function getADatabaseTransparentDataEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.transparentDataEncryptions.get(
    "security-tde-resourcegroup",
    "securitytde",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main() {
  await getADatabaseTransparentDataEncryption();
}

main().catch(console.error);
