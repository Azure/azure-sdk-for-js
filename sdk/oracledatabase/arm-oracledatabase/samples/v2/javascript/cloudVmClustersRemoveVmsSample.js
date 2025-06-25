// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove VMs from the VM Cluster
 *
 * @summary remove VMs from the VM Cluster
 * x-ms-original-file: 2025-03-01/vmClusters_removeVms.json
 */
async function cloudVmClustersRemoveVms() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.removeVms("rg000", "cluster1", {
    dbServers: ["ocid1..aaaa"],
  });
  console.log(result);
}

async function main() {
  await cloudVmClustersRemoveVms();
}

main().catch(console.error);
