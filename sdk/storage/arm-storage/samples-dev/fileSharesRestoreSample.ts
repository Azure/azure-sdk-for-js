// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restore a file share within a valid retention days if share soft delete is enabled
 *
 * @summary restore a file share within a valid retention days if share soft delete is enabled
 * x-ms-original-file: 2026-04-01/FileSharesRestore.json
 */
async function restoreShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.fileShares.restore("res3376", "sto328", "share1249", {
    deletedShareName: "share1249",
    deletedShareVersion: "1234567890",
  });
}

async function main(): Promise<void> {
  await restoreShares();
}

main().catch(console.error);
