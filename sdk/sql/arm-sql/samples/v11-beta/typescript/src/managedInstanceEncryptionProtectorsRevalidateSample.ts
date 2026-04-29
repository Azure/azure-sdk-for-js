// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revalidates an existing encryption protector.
 *
 * @summary revalidates an existing encryption protector.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceEncryptionProtectorRevalidate.json
 */
async function revalidatesTheEncryptionProtector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.managedInstanceEncryptionProtectors.revalidate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "current",
  );
}

async function main(): Promise<void> {
  await revalidatesTheEncryptionProtector();
}

main().catch(console.error);
