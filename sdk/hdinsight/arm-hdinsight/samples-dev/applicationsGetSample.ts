// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets properties of the specified application.
 *
 * @summary Gets properties of the specified application.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetApplicationInProgress.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getApplicationOnHdInsightClusterCreationInProgress(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const applicationName = "app";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.applications.get(resourceGroupName, clusterName, applicationName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets properties of the specified application.
 *
 * @summary Gets properties of the specified application.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetApplicationCreated.json
 */
async function getApplicationOnHdInsightClusterSuccessfullyCreated(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const applicationName = "app";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.applications.get(resourceGroupName, clusterName, applicationName);
  console.log(result);
}

async function main(): Promise<void> {
  await getApplicationOnHdInsightClusterCreationInProgress();
  await getApplicationOnHdInsightClusterSuccessfullyCreated();
}

main().catch(console.error);
