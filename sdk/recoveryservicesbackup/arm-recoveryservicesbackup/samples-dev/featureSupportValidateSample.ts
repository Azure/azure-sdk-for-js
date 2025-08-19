// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to It will validate if given feature with resource properties is supported in service
 *
 * @summary It will validate if given feature with resource properties is supported in service
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureIaasVm/BackupFeature_Validate.json
 */

import {
  AzureVMResourceFeatureSupportRequest,
  RecoveryServicesBackupClient,
} from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkAzureVMBackupFeatureSupport(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const azureRegion = "southeastasia";
  const parameters: AzureVMResourceFeatureSupportRequest = {
    featureType: "AzureVMResourceBackup",
    vmSize: "Basic_A0",
    vmSku: "Premium",
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.featureSupport.validate(azureRegion, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await checkAzureVMBackupFeatureSupport();
}

main().catch(console.error);
