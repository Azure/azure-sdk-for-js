// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified application on the HDInsight cluster.
 *
 * @summary deletes the specified application on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DeleteApplication.json
 */
async function deleteApplicationFromHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.applications.delete("rg1", "cluster1", "hue");
}

async function main(): Promise<void> {
  await deleteApplicationFromHDInsightCluster();
}

main().catch(console.error);
