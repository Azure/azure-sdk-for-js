// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
operation can be fetched using GetProtectionPolicyOperationResult API.
 *
 * @summary Deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
operation can be fetched using GetProtectionPolicyOperationResult API.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureIaasVm/ProtectionPolicies_Delete.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAzureVMProtectionPolicy(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const policyName = "testPolicy1";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.beginDeleteAndWait(
    vaultName,
    resourceGroupName,
    policyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAzureVMProtectionPolicy();
}

main().catch(console.error);
