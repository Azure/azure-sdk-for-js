// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables the Azure Monitor on the HDInsight cluster.
 *
 * @summary disables the Azure Monitor on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterAzureMonitor.json
 */
async function disableAzureMonitor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.disableAzureMonitor("rg1", "cluster1");
}

async function main(): Promise<void> {
  await disableAzureMonitor();
}

main().catch(console.error);
