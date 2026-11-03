// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the endpoint access credentials to the resource.
 *
 * @summary gets the endpoint access credentials to the resource.
 * x-ms-original-file: 2027-01-01/Endpoints_ListCredentials_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsPostListCredentialsGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "zctvtuhbhezloxvc",
    { listCredentialsRequest: { serviceName: "SSH" }, expiresin: 10019 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the endpoint access credentials to the resource.
 *
 * @summary gets the endpoint access credentials to the resource.
 * x-ms-original-file: 2027-01-01/Endpoints_ListCredentials_MinimumSet_Gen.json
 */
async function hybridConnectivityEndpointsPostListCredentialsGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "yfaebuxkhicaact",
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsPostListCredentialsGeneratedByMaximumSetRule();
  await hybridConnectivityEndpointsPostListCredentialsGeneratedByMinimumSetRule();
}

main().catch(console.error);
