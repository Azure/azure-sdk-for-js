// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server encryption protector.
 *
 * @summary gets a server encryption protector.
 * x-ms-original-file: 2025-02-01-preview/EncryptionProtectorGet.json
 */
async function getTheEncryptionProtector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
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
async function getTheEncryptionProtectorWithVersionlessKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.encryptionProtectors.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheEncryptionProtector();
  await getTheEncryptionProtectorWithVersionlessKey();
}

main().catch(console.error);
