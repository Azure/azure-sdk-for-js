// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of attached database configurations of the given Kusto cluster.
 *
 * @summary returns the list of attached database configurations of the given Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsListByCluster.json
 */
async function kustoAttachedDatabaseConfigurationsListByCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.attachedDatabaseConfigurations.listByCluster(
    "kustorptest",
    "kustoCluster2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoAttachedDatabaseConfigurationsListByCluster();
}

main().catch(console.error);
