// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revalidates an existing encryption protector for a particular database.
 *
 * @summary revalidates an existing encryption protector for a particular database.
 * x-ms-original-file: 2025-02-01-preview/DatabaseEncryptionProtectorRevalidate.json
 */
async function revalidatesTheEncryptionProtectorForAParticularDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.databaseEncryptionProtectors.revalidate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "sqlcrudtestdb-2342",
    "current",
  );
}

async function main(): Promise<void> {
  await revalidatesTheEncryptionProtectorForAParticularDatabase();
}

main().catch(console.error);
