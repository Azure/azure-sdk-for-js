// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance
 *
 * @summary a failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance
 * x-ms-original-file: 2025-08-01/StorageAccountFailover.json
 */
async function storageAccountFailover() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.failover("res4228", "sto2434");
}

/**
 * This sample demonstrates how to a failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance
 *
 * @summary a failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance
 * x-ms-original-file: 2025-08-01/StorageAccountFailoverPlanned.json
 */
async function storageAccountFailoverPlanned() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.failover("res4228", "sto2434", { failoverType: "Planned" });
}

async function main() {
  await storageAccountFailover();
  await storageAccountFailoverPlanned();
}

main().catch(console.error);
