// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to remove VMs from the VM Cluster
 *
 * @summary remove VMs from the VM Cluster
 * x-ms-original-file: 2025-03-01/vmClusters_removeVms.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function cloudVmClustersRemoveVms(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.removeVms("rg000", "cluster1", {
    dbServers: ["ocid1..aaaa"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cloudVmClustersRemoveVms();
}

main().catch(console.error);
