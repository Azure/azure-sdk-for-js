// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specific private endpoint connection.
 *
 * @summary Deletes the specific private endpoint connection.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/DeletePrivateEndpointConnection.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteSpecificPrivateEndpointConnectionForASpecificHdInsightCluster(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const privateEndpointConnectionName = "testprivateep.b3bf5fed-9b12-4560-b7d0-2abe1bba07e2";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginDeleteAndWait(
    resourceGroupName,
    clusterName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSpecificPrivateEndpointConnectionForASpecificHdInsightCluster();
}

main().catch(console.error);
