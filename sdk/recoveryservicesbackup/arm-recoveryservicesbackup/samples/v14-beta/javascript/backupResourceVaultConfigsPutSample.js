// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates vault security config.
 *
 * @summary updates vault security config.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupResourceVaultConfigs_Put.json
 */
async function updateVaultSecurityConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceVaultConfigs.put("SwaggerTest", "SwaggerTestRg", {
    properties: { enhancedSecurityState: "Enabled", softDeleteFeatureState: "Enabled" },
  });
  console.log(result);
}

async function main() {
  await updateVaultSecurityConfig();
}

main().catch(console.error);
