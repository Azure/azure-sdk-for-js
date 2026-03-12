// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead.
 *
 * @summary The configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/HDI_Configurations_Get.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCoreSiteSettings(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const configurationName = "core-site";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.configurations.get(resourceGroupName, clusterName, configurationName);
  console.log(result);
}

async function main(): Promise<void> {
  await getCoreSiteSettings();
}

main().catch(console.error);
