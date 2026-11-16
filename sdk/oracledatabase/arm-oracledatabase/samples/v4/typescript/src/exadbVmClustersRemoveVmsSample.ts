// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove VMs from the VM Cluster
 *
 * @summary remove VMs from the VM Cluster
 * x-ms-original-file: 2026-06-01/ExadbVmClusters_RemoveVms_MaximumSet_Gen.json
 */
async function exadbVmClustersRemoveVmsMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.removeVms("rgopenapi", "resource1", {
    dbNodes: [
      {
        dbNodeId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/exadbVmClusters/vmcluster1/dbNodes/node1",
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exadbVmClustersRemoveVmsMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
