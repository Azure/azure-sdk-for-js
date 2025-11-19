// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add VMs to the VM Cluster
 *
 * @summary add VMs to the VM Cluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_AddVms_MaximumSet_Gen.json
 */
async function addVMsToVMClusterGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.addVms("rgopenapi", "cloudvmcluster1", {
    dbServers: ["ocid1..aaaa", "ocid1..aaaaaa"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to add VMs to the VM Cluster
 *
 * @summary add VMs to the VM Cluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_AddVms_MinimumSet_Gen.json
 */
async function addVMsToVMClusterGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.addVms("rgopenapi", "cloudvmcluster1", {
    dbServers: ["ocid1..aaaa", "ocid1..aaaaaa"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to add VMs to the VM Cluster
 *
 * @summary add VMs to the VM Cluster
 * x-ms-original-file: 2025-09-01/vmClusters_addVms.json
 */
async function cloudVmClustersAddVms(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.addVms("rg000", "cluster1", {
    dbServers: ["ocid1..aaaa", "ocid1..aaaaaa"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await addVMsToVMClusterGeneratedByMaximumSetRule();
  await addVMsToVMClusterGeneratedByMinimumSetRule();
  await cloudVmClustersAddVms();
}

main().catch(console.error);
