// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the details of the backed up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 *
 * @summary provides the details of the backed up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ClassicCompute_ProtectedItem_Get.json
 */
async function getProtectedClassicVirtualMachineDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectedItems.get(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "Azure",
    "iaasvmcontainer;iaasvmcontainer;iaasvm-rg;iaasvm-1",
    "vm;iaasvmcontainer;iaasvm-rg;iaasvm-1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to provides the details of the backed up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 *
 * @summary provides the details of the backed up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/Compute_ProtectedItem_Get.json
 */
async function getProtectedVirtualMachineDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectedItems.get(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "Azure",
    "iaasvmcontainer;iaasvmcontainerv2;iaasvm-rg;iaasvm-1",
    "vm;iaasvmcontainerv2;iaasvm-rg;iaasvm-1",
  );
  console.log(result);
}

async function main() {
  await getProtectedClassicVirtualMachineDetails();
  await getProtectedVirtualMachineDetails();
}

main().catch(console.error);
