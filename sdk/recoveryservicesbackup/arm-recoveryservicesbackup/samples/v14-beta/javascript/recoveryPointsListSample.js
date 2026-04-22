// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the backup copies for the backed up item.
 *
 * @summary lists the backup copies for the backed up item.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/RecoveryPoints_List.json
 */
async function getProtectedAzureVmRecoveryPoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoveryPoints.list(
    "rshvault",
    "rshhtestmdvmrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;rshhtestmdvmrg;rshmdvmsmall",
    "VM;iaasvmcontainerv2;rshhtestmdvmrg;rshmdvmsmall",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getProtectedAzureVmRecoveryPoints();
}

main().catch(console.error);
