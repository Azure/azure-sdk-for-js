// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove VMs from the VM Cluster
 *
 * @summary remove VMs from the VM Cluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_RemoveVms_MaximumSet_Gen.json
 */
async function exadbVmClustersRemoveVmsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.removeVms("rgopenapi", "exadbVmClusterName1", {
    dbNodes: [
      {
        dbNodeId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Oracle.Database/exadbVmClusters/vmCluster/dbNodes/dbNodeName",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to remove VMs from the VM Cluster
 *
 * @summary remove VMs from the VM Cluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_RemoveVms_MinimumSet_Gen.json
 */
async function exadbVmClustersRemoveVmsMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.removeVms("rgopenapi", "vmCluster1", {
    dbNodes: [
      {
        dbNodeId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Oracle.Database/exadbVmClusters/vmCluster/dbNodes/dbNodeName",
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exadbVmClustersRemoveVmsMaximumSet();
  await exadbVmClustersRemoveVmsMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
