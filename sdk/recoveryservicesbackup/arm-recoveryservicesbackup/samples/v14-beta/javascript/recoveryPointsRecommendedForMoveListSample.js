// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the recovery points recommended for move to another tier
 *
 * @summary lists the recovery points recommended for move to another tier
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/RecoveryPointsRecommendedForMove_List.json
 */
async function getProtectedAzureVmRecoveryPointsRecommendedForMove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoveryPointsRecommendedForMove.list(
    "rshvault",
    "rshhtestmdvmrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;rshhtestmdvmrg;rshmdvmsmall",
    "VM;iaasvmcontainerv2;rshhtestmdvmrg;rshmdvmsmall",
    {
      excludedRPList: ["348916168024334", "348916168024335"],
      objectType: "ListRecoveryPointsRecommendedForMoveRequest",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getProtectedAzureVmRecoveryPointsRecommendedForMove();
}

main().catch(console.error);
