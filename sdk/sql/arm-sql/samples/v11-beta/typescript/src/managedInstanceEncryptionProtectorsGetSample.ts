// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed instance encryption protector.
 *
 * @summary gets a managed instance encryption protector.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceEncryptionProtectorGet.json
 */
async function getTheEncryptionProtector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceEncryptionProtectors.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheEncryptionProtector();
}

main().catch(console.error);
