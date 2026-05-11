// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of endpoints to the target resource.
 *
 * @summary list of endpoints to the target resource.
 * x-ms-original-file: 2024-12-01/EndpointsList.json
 */
async function hybridConnectivityEndpointsGet() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.endpoints.list(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await hybridConnectivityEndpointsGet();
}

main().catch(console.error);
