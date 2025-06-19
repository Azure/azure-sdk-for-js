// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove VMs from the VM Cluster
 *
 * @summary remove VMs from the VM Cluster
 * x-ms-original-file: 2025-03-01/ExadbVmClusters_RemoveVms_MaximumSet_Gen.json
 */
async function exadbVmClustersRemoveVmsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.removeVms("rgopenapi", "vmClusterName", {
    dbNodes: [
      {
        dbNodeId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Oracle.Database/exadbVmClusters/vmCluster/dbNodes/dbNodeName",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await exadbVmClustersRemoveVmsMaximumSet();
}

main().catch(console.error);
