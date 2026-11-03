// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an HDInsight cluster extension.
 *
 * @summary creates an HDInsight cluster extension.
 * x-ms-original-file: 2025-01-15-preview/CreateExtension.json
 */
async function createAMonitoringExtensionOnHadoopLinuxCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.create("rg1", "cluster1", "clustermonitoring", {
    primaryKey: "**********",
    workspaceId: "a2090ead-8c9f-4fba-b70e-533e3e003163",
  });
}

async function main(): Promise<void> {
  await createAMonitoringExtensionOnHadoopLinuxCluster();
}

main().catch(console.error);
