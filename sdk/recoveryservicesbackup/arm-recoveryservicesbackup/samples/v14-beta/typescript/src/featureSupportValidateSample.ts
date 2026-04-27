// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to it will validate if given feature with resource properties is supported in service
 *
 * @summary it will validate if given feature with resource properties is supported in service
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/BackupFeature_Validate.json
 */
async function checkAzureVmBackupFeatureSupport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.featureSupport.validate("southeastasia", {
    featureType: "AzureVMResourceBackup",
    vmSize: "Basic_A0",
    vmSku: "Premium",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkAzureVmBackupFeatureSupport();
}

main().catch(console.error);
