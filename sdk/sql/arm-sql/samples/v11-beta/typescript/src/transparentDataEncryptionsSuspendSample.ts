// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to suspend ongoing logical database's Transparent Data Encryption scan configuration.
 *
 * @summary suspend ongoing logical database's Transparent Data Encryption scan configuration.
 * x-ms-original-file: 2025-02-01-preview/SuspendTransparentDataEncryptionUpdate.json
 */
async function suspendDatabaseTransparentDataEncryptionScanStateWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.transparentDataEncryptions.suspend(
    "securitytde-42-rg",
    "securitytde-42",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await suspendDatabaseTransparentDataEncryptionScanStateWithMinimalParameters();
}

main().catch(console.error);
