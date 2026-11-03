// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve or reject a private endpoint connection manually.
 *
 * @summary approve or reject a private endpoint connection manually.
 * x-ms-original-file: 2025-01-15-preview/ApprovePrivateEndpointConnection.json
 */
async function approveAPrivateEndpointConnectionManually(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "rg1",
    "cluster1",
    "testprivateep.b3bf5fed-9b12-4560-b7d0-2abe1bba07e2",
    {
      privateLinkServiceConnectionState: {
        description: "update it from pending to approved.",
        actionsRequired: "None",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveAPrivateEndpointConnectionManually();
}

main().catch(console.error);
