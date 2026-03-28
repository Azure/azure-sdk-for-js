// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specific private endpoint connection.
 *
 * @summary gets the specific private endpoint connection.
 * x-ms-original-file: 2025-01-15-preview/GetPrivateEndpointConnection.json
 */
async function getSpecificPrivateEndpointConnectionForASpecificHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rg1",
    "cluster1",
    "testprivateep.b3bf5fed-9b12-4560-b7d0-2abe1bba07e2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSpecificPrivateEndpointConnectionForASpecificHDInsightCluster();
}

main().catch(console.error);
