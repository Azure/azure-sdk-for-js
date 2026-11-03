// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the gateway settings for the specified cluster.
 *
 * @summary gets the gateway settings for the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/HDI_Clusters_GetGatewaySettings.json
 */
async function getHttpSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.getGatewaySettings("rg1", "cluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getHttpSettings();
}

main().catch(console.error);
