// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operations on jobs of HDInsight on AKS cluster.
 *
 * @summary Operations on jobs of HDInsight on AKS cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/RunClusterJob.json
 */

import type { ClusterJob } from "@azure/arm-hdinsightcontainers";
import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function runClusterJob(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterName = "cluster1";
  const clusterJob: ClusterJob = {
    properties: {
      action: "START",
      entryClass: "com.microsoft.hilo.flink.job.streaming.SleepJob",
      flinkConfiguration: {
        parallelism: "1",
        savepointDirectory: "abfs://flinkjob@hilosa.dfs.core.windows.net/savepoint",
      },
      jarName: "flink-sleep-job-0.0.1-SNAPSHOT.jar",
      jobJarDirectory: "abfs://flinkjob@hilosa.dfs.core.windows.net/jars",
      jobName: "flink-job-name",
      jobType: "FlinkJob",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterJobs.beginRunJobAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterName,
    clusterJob,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runClusterJob();
}

main().catch(console.error);
