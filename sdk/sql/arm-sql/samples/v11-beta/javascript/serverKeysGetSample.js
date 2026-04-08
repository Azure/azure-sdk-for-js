// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a server key.
 *
 * @summary gets a server key.
 * x-ms-original-file: 2025-02-01-preview/ServerKeyGet.json
 */
async function getTheServerKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverKeys.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "someVault_someKey_01234567890123456789012345678901",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a server key.
 *
 * @summary gets a server key.
 * x-ms-original-file: 2025-02-01-preview/ServerKeyGetWithVersionlessKey.json
 */
async function getTheServerKeyWithVersionlessKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverKeys.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "someVault_someKey",
  );
  console.log(result);
}

async function main() {
  await getTheServerKey();
  await getTheServerKeyWithVersionlessKey();
}

main().catch(console.error);
