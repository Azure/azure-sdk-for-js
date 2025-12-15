// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the endpoint to the resource.
 *
 * @summary gets the endpoint to the resource.
 * x-ms-original-file: 2024-12-01/EndpointsGetCustom.json
 */
async function hybridConnectivityEndpointsGetCustom() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "custom",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the endpoint to the resource.
 *
 * @summary gets the endpoint to the resource.
 * x-ms-original-file: 2024-12-01/EndpointsGetDefault.json
 */
async function hybridConnectivityEndpointsGetDefault() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.get(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "default",
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsGetCustom();
  await hybridConnectivityEndpointsGetDefault();
}

main().catch(console.error);
