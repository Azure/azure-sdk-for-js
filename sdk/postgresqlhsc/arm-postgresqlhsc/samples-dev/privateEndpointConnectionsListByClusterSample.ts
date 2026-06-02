// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of private endpoint connections on a cluster.
 *
 * @summary gets list of private endpoint connections on a cluster.
 * x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionsListByCluster.json
 */
async function getsListOfPrivateEndpointConnectionsOnACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByCluster(
    "TestResourceGroup",
    "testcluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfPrivateEndpointConnectionsOnACluster();
}

main().catch(console.error);
