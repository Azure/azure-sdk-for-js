// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified extension for HDInsight cluster.
 *
 * @summary Deletes the specified extension for HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/DeleteExtension.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnExtension(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const extensionName = "clustermonitoring";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.extensions.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    extensionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnExtension();
}

main().catch(console.error);
