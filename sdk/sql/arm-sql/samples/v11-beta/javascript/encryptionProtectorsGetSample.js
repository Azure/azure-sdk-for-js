// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a server encryption protector.
 *
 * @summary gets a server encryption protector.
 * x-ms-original-file: 2025-02-01-preview/EncryptionProtectorGet.json
 */
async function getTheEncryptionProtector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a server encryption protector.
 *
 * @summary gets a server encryption protector.
 * x-ms-original-file: 2025-02-01-preview/EncryptionProtectorGetWithVersionlessKey.json
 */
async function getTheEncryptionProtectorWithVersionlessKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
  );
  console.log(result);
}

async function main() {
  await getTheEncryptionProtector();
  await getTheEncryptionProtectorWithVersionlessKey();
}

main().catch(console.error);
