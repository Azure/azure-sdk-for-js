// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of Azure Monitor Agent on the HDInsight cluster.
 *
 * @summary gets the status of Azure Monitor Agent on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxClusterAzureMonitorAgentStatus.json
 */
async function getAzureMonitorAgentStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.extensions.getAzureMonitorAgentStatus("rg1", "cluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAzureMonitorAgentStatus();
}

main().catch(console.error);
