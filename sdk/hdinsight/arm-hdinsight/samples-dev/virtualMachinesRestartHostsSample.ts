// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts the specified HDInsight cluster hosts.
 *
 * @summary restarts the specified HDInsight cluster hosts.
 * x-ms-original-file: 2025-01-15-preview/RestartVirtualMachinesOperation.json
 */
async function restartsTheSpecifiedHDInsightClusterHosts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.virtualMachines.restartHosts("rg1", "cluster1", ["gateway1", "gateway3"]);
}

async function main(): Promise<void> {
  await restartsTheSpecifiedHDInsightClusterHosts();
}

main().catch(console.error);
