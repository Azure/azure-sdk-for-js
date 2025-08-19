// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the applications for the HDInsight cluster.
 *
 * @summary Lists all of the applications for the HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetAllApplications.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAllApplicationsForAnHdInsightCluster(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.listByCluster(resourceGroupName, clusterName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllApplicationsForAnHdInsightCluster();
}

main().catch(console.error);
