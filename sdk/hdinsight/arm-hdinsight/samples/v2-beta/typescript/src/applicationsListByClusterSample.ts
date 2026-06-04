// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the applications for the HDInsight cluster.
 *
 * @summary lists all of the applications for the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/GetAllApplications.json
 */
async function getAllApplicationsForAnHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.listByCluster("rg1", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllApplicationsForAnHDInsightCluster();
}

main().catch(console.error);
