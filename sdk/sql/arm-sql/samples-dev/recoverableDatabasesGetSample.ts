// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a recoverable database.
 *
 * @summary gets a recoverable database.
 * x-ms-original-file: 2025-02-01-preview/RecoverableDatabaseGet.json
 */
async function getARecoverableDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.recoverableDatabases.get(
    "recoverabledatabasetest-6852",
    "recoverabledatabasetest-2080",
    "recoverabledatabasetest-9187",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a recoverable database.
 *
 * @summary gets a recoverable database.
 * x-ms-original-file: 2025-02-01-preview/RecoverableDatabaseGetWithExpandEqualsKeys.json
 */
async function getsARecoverableDatabaseWithExpandEqualsKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.recoverableDatabases.get(
    "recoverabledatabasetest-6852",
    "recoverabledatabasetest-2080",
    "recoverabledatabasetest-9187",
    { expand: "keys" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARecoverableDatabase();
  await getsARecoverableDatabaseWithExpandEqualsKeys();
}

main().catch(console.error);
