// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Autoscale Configuration for HDInsight cluster.
 *
 * @summary updates the Autoscale Configuration for HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DisableClusterAutoScale.json
 */
async function disableAutoscaleForTheHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateAutoScaleConfiguration("rg1", "cluster1", "workernode", {});
}

/**
 * This sample demonstrates how to updates the Autoscale Configuration for HDInsight cluster.
 *
 * @summary updates the Autoscale Configuration for HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/EnableOrUpdateAutoScaleWithLoadBasedConfiguration.json
 */
async function enableOrUpdateAutoscaleWithTheLoadBasedConfigurationForHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateAutoScaleConfiguration("rg1", "cluster1", "workernode", {
    autoscale: { capacity: { maxInstanceCount: 5, minInstanceCount: 3 } },
  });
}

/**
 * This sample demonstrates how to updates the Autoscale Configuration for HDInsight cluster.
 *
 * @summary updates the Autoscale Configuration for HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/EnableOrUpdateAutoScaleWithScheduleBasedConfiguration.json
 */
async function enableOrUpdateAutoscaleWithTheScheduleBasedConfigurationForHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateAutoScaleConfiguration("rg1", "cluster1", "workernode", {
    autoscale: {
      recurrence: {
        schedule: [
          {
            days: ["Thursday"],
            timeAndCapacity: { maxInstanceCount: 4, minInstanceCount: 4, time: "16:00" },
          },
        ],
        timeZone: "China Standard Time",
      },
    },
  });
}

async function main(): Promise<void> {
  await disableAutoscaleForTheHDInsightCluster();
  await enableOrUpdateAutoscaleWithTheLoadBasedConfigurationForHDInsightCluster();
  await enableOrUpdateAutoscaleWithTheScheduleBasedConfigurationForHDInsightCluster();
}

main().catch(console.error);
