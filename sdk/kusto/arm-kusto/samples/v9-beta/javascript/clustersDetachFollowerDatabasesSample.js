// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to detaches all followers of a database owned by this cluster.
 *
 * @summary detaches all followers of a database owned by this cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterDetachFollowerDatabases.json
 */
async function kustoClusterDetachFollowerDatabases() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.detachFollowerDatabases("kustorptest", "kustoCluster", {
    attachedDatabaseConfigurationName: "attachedDatabaseConfigurationsTest",
    clusterResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Kusto/clusters/kustoCluster2",
  });
}

async function main() {
  await kustoClusterDetachFollowerDatabases();
}

main().catch(console.error);
