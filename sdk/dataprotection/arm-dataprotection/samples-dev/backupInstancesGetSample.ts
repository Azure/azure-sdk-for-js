// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a backup instance with name in a backup vault
 *
 * @summary gets a backup instance with name in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/GetBackupInstance.json
 */
async function getBackupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a backup instance with name in a backup vault
 *
 * @summary gets a backup instance with name in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/GetBackupInstance_ADLSBlobBackupDatasourceParameters.json
 */
async function getBackupInstanceForAdlsBlob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "54707983-993e-43de-8d94-074451394eda";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.get("adlsrg", "adlsvault", "adlsbackupinstance");
  console.log(result);
}

async function main(): Promise<void> {
  await getBackupInstance();
  await getBackupInstanceForAdlsBlob();
}

main().catch(console.error);
