// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 *
 * @summary provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionPolicies_Get.json
 */
async function getAzureIaasVmProtectionPolicyDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "testPolicy1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 *
 * @summary provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/V2Policy/v2-Get-Policy.json
 */
async function getAzureIaasVmEnhancedProtectionPolicyDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "v2-daily-sample",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 *
 * @summary provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/ProtectionPolicies_Get_SapHanaDBInstance.json
 */
async function getSapHanaDBInstanceWorkloadProtectionPolicyDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.get(
    "HanaTestRsVault",
    "SwaggerTestRg",
    "testHanaSnapshotV2Policy1",
  );
  console.log(result);
}

async function main() {
  await getAzureIaasVmProtectionPolicyDetails();
  await getAzureIaasVmEnhancedProtectionPolicyDetails();
  await getSapHanaDBInstanceWorkloadProtectionPolicyDetails();
}

main().catch(console.error);
