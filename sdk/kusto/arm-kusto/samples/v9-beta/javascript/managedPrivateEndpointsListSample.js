// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of managed private endpoints.
 *
 * @summary returns the list of managed private endpoints.
 * x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsList.json
 */
async function kustoManagedPrivateEndpointsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedPrivateEndpoints.list("kustorptest", "kustoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoManagedPrivateEndpointsList();
}

main().catch(console.error);
