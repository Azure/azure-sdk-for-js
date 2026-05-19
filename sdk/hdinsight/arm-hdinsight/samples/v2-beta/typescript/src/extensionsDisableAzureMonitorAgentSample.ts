// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables the Azure Monitor Agent on the HDInsight cluster.
 *
 * @summary disables the Azure Monitor Agent on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterAzureMonitorAgent.json
 */
async function disableAzureMonitorAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.disableAzureMonitorAgent("rg1", "cluster1");
}

async function main(): Promise<void> {
  await disableAzureMonitorAgent();
}

main().catch(console.error);
