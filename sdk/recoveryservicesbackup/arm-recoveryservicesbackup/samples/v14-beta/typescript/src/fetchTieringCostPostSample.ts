// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 *
 * @summary provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/TieringCost/FetchTieringCostForPolicy.json
 */
async function getTheTieringSavingsCostInfoForPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.fetchTieringCost.post("netsdktestrg", "testVault", {
    objectType: "FetchTieringCostSavingsInfoForPolicyRequest",
    policyName: "monthly",
    sourceTierType: "HardenedRP",
    targetTierType: "ArchivedRP",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 *
 * @summary provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/TieringCost/FetchTieringCostForProtectedItem.json
 */
async function getTheTieringSavingsCostInfoForProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.fetchTieringCost.post("netsdktestrg", "testVault", {
    containerName: "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    objectType: "FetchTieringCostSavingsInfoForProtectedItemRequest",
    protectedItemName: "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    sourceTierType: "HardenedRP",
    targetTierType: "ArchivedRP",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 *
 * @summary provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/TieringCost/FetchTieringCostForRehydrate.json
 */
async function getTheRehydrationCostForRecoveryPoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.fetchTieringCost.post("netsdktestrg", "testVault", {
    containerName: "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    objectType: "FetchTieringCostInfoForRehydrationRequest",
    protectedItemName: "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    recoveryPointId: "1222343434",
    rehydrationPriority: "High",
    sourceTierType: "ArchivedRP",
    targetTierType: "HardenedRP",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 *
 * @summary provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/TieringCost/FetchTieringCostForVault.json
 */
async function getTheTieringSavingsCostInfoForVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.fetchTieringCost.post("netsdktestrg", "testVault", {
    objectType: "FetchTieringCostSavingsInfoForVaultRequest",
    sourceTierType: "HardenedRP",
    targetTierType: "ArchivedRP",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getTheTieringSavingsCostInfoForPolicy();
  await getTheTieringSavingsCostInfoForProtectedItem();
  await getTheRehydrationCostForRecoveryPoint();
  await getTheTieringSavingsCostInfoForVault();
}

main().catch(console.error);
