// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the HDInsight clusters hosts
 *
 * @summary lists the HDInsight clusters hosts
 * x-ms-original-file: 2025-01-15-preview/GetClusterVirtualMachines.json
 */
async function getAllHostsInTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.listHosts("rg1", "cluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAllHostsInTheCluster();
}

main().catch(console.error);
