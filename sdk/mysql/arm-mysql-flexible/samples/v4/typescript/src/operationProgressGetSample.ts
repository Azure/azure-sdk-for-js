// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the operation result for a long running operation.
 *
 * @summary get the operation result for a long running operation.
 * x-ms-original-file: 2024-12-30/OperationProgress_Get_BackupAndExport.json
 */
async function operationProgressGetBackupAndExport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.operationProgress.get(
    "westus",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the operation result for a long running operation.
 *
 * @summary get the operation result for a long running operation.
 * x-ms-original-file: 2024-12-30/OperationProgress_Get_ImportFromStorage.json
 */
async function operationProgressGetImportFromStorage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.operationProgress.get(
    "westus",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await operationProgressGetBackupAndExport();
  await operationProgressGetImportFromStorage();
}

main().catch(console.error);
