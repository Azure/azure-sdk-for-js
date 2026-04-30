// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches resource storage config.
 *
 * @summary fetches resource storage config.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupStorageConfig_Get.json
 */
async function getVaultStorageConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceStorageConfigsNonCRR.get(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
  );
  console.log(result);
}

async function main() {
  await getVaultStorageConfiguration();
}

main().catch(console.error);
