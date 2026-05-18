// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a logical database's transparent data encryption configuration.
 *
 * @summary updates a logical database's transparent data encryption configuration.
 * x-ms-original-file: 2025-02-01-preview/TransparentDataEncryptionUpdate.json
 */
async function updateADatabaseTransparentDataEncryptionStateWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.transparentDataEncryptions.createOrUpdate(
    "securitytde-42-rg",
    "securitytde-42",
    "testdb",
    "current",
    { scanState: "Suspend", state: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateADatabaseTransparentDataEncryptionStateWithMinimalParameters();
}

main().catch(console.error);
