// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the endpoint access to the target resource.
 *
 * @summary deletes the endpoint access to the target resource.
 * x-ms-original-file: 2024-12-01/EndpointsDeleteDefault.json
 */
async function hybridConnectivityEndpointsDeleteDefault() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  await client.endpoints.delete(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "default",
  );
}

async function main() {
  await hybridConnectivityEndpointsDeleteDefault();
}

main().catch(console.error);
