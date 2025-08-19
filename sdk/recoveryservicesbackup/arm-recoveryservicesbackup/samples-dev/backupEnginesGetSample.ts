// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns backup management server registered to Recovery Services Vault.
 *
 * @summary Returns backup management server registered to Recovery Services Vault.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Dpm/BackupEngines_Get.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDpmOrAzureBackupServerOrLajollaBackupEngineDetails(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "testVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "testRG";
  const backupEngineName = "testServer";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupEngines.get(
    vaultName,
    resourceGroupName,
    backupEngineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDpmOrAzureBackupServerOrLajollaBackupEngineDetails();
}

main().catch(console.error);
