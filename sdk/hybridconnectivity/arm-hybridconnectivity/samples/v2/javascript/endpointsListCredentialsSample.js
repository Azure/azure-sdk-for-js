// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the endpoint access credentials to the resource.
 *
 * @summary gets the endpoint access credentials to the resource.
 * x-ms-original-file: 2024-12-01/EndpointsPostListCredentials.json
 */
async function hybridConnectivityEndpointsPostListCredentials() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "default",
    { listCredentialsRequest: { serviceName: "SSH" }, expiresin: 10800 },
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsPostListCredentials();
}

main().catch(console.error);
