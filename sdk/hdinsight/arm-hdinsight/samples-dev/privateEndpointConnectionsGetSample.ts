// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specific private endpoint connection.
 *
 * @summary Gets the specific private endpoint connection.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetPrivateEndpointConnection.json
 */
async function getSpecificPrivateEndpointConnectionForASpecificHdInsightCluster(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const privateEndpointConnectionName = "testprivateep.b3bf5fed-9b12-4560-b7d0-2abe1bba07e2";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    resourceGroupName,
    clusterName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSpecificPrivateEndpointConnectionForASpecificHdInsightCluster();
}

main().catch(console.error);
