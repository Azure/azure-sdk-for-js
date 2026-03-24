// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
 * operation can be fetched using GetProtectionPolicyOperationResult API.
 *
 * @summary deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
 * operation can be fetched using GetProtectionPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionPolicies_Delete.json
 */
async function deleteAzureVmProtectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionPolicies.delete("NetSDKTestRsVault", "SwaggerTestRg", "testPolicy1");
}

async function main(): Promise<void> {
  await deleteAzureVmProtectionPolicy();
}

main().catch(console.error);
