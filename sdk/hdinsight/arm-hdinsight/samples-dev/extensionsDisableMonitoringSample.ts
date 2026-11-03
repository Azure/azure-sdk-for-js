// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables the Operations Management Suite (OMS) on the HDInsight cluster.
 *
 * @summary disables the Operations Management Suite (OMS) on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterMonitoring.json
 */
async function disableClusterMonitoring(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.disableMonitoring("rg1", "cluster1");
}

async function main(): Promise<void> {
  await disableClusterMonitoring();
}

main().catch(console.error);
