// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates vault storage model type.
 *
 * @summary Updates vault storage model type.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Common/BackupStorageConfig_Patch.json
 */

import {
  BackupResourceConfigResource,
  RecoveryServicesBackupClient,
} from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateVaultStorageConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "PySDKBackupTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] ||
    "PythonSDKBackupTestRg";
  const parameters: BackupResourceConfigResource = {
    properties: {
      storageType: "LocallyRedundant",
      storageTypeState: "Unlocked",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupResourceStorageConfigsNonCRR.patch(
    vaultName,
    resourceGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVaultStorageConfiguration();
}

main().catch(console.error);
