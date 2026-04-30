// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches resource vault config.
 *
 * @summary fetches resource vault config.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupResourceVaultConfigs_Get.json
 */
async function getVaultSecurityConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceVaultConfigs.get("SwaggerTest", "SwaggerTestRg");
  console.log(result);
}

async function main() {
  await getVaultSecurityConfig();
}

main().catch(console.error);
