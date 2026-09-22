// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the network endpoints of all outbound dependencies of a Kusto cluster
 *
 * @summary gets the network endpoints of all outbound dependencies of a Kusto cluster
 * x-ms-original-file: 2025-02-14/KustoOutboundNetworkDependenciesList.json
 */
async function getKustoClusterOutboundNetworkDependencies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listOutboundNetworkDependenciesEndpoints(
    "kustorptest",
    "kustoCluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getKustoClusterOutboundNetworkDependencies();
}

main().catch(console.error);
