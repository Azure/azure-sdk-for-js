// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of private link resources.
 *
 * @summary returns the list of private link resources.
 * x-ms-original-file: 2025-02-14/KustoPrivateLinkResourcesList.json
 */
async function getsPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("kustorptest", "kustoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPrivateEndpointConnections();
}

main().catch(console.error);
