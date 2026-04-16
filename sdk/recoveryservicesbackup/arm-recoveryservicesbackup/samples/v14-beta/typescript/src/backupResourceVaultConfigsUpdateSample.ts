// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates vault security config.
 *
 * @summary updates vault security config.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupResourceVaultConfigs_Patch.json
 */
async function updateVaultSecurityConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceVaultConfigs.update("SwaggerTest", "SwaggerTestRg", {
    properties: { enhancedSecurityState: "Enabled" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateVaultSecurityConfig();
}

main().catch(console.error);
