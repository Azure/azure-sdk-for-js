// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified extension for HDInsight cluster.
 *
 * @summary deletes the specified extension for HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DeleteExtension.json
 */
async function deleteAnExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.delete("rg1", "cluster1", "clustermonitoring");
}

async function main(): Promise<void> {
  await deleteAnExtension();
}

main().catch(console.error);
