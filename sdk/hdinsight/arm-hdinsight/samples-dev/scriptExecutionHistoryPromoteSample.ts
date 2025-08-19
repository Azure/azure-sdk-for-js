// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Promotes the specified ad-hoc script execution to a persisted script.
 *
 * @summary Promotes the specified ad-hoc script execution to a persisted script.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/PromoteLinuxHadoopScriptAction.json
 */
async function promoteAScriptActionOnHdInsightCluster(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const scriptExecutionId = "391145124054712";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.scriptExecutionHistory.promote(
    resourceGroupName,
    clusterName,
    scriptExecutionId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await promoteAScriptActionOnHdInsightCluster();
}

main().catch(console.error);
