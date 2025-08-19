// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of available cluster pool versions.
 *
 * @summary Returns a list of available cluster pool versions.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/ListAvailableClusterPoolVersions.json
 */

import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function clusterPoolVersionListResult(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const location = "westus2";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableClusterPoolVersions.listByLocation(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await clusterPoolVersionListResult();
}

main().catch(console.error);
