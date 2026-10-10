// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the managed proxy details
 *
 * @summary fetches the managed proxy details
 * x-ms-original-file: 2027-01-01/Endpoints_ListManagedProxyDetails_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsPostListManagedProxyDetailsGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listManagedProxyDetails(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "bjamsbnl",
    { hostname: "r.proxy.arc.com", service: "127.0.0.1:65035", serviceName: "WAC" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to fetches the managed proxy details
 *
 * @summary fetches the managed proxy details
 * x-ms-original-file: 2027-01-01/Endpoints_ListManagedProxyDetails_MinimumSet_Gen.json
 */
async function hybridConnectivityEndpointsPostListManagedProxyDetailsGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listManagedProxyDetails(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "ujpppanchofwgjdv",
    { service: "127.0.0.1:65035" },
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsPostListManagedProxyDetailsGeneratedByMaximumSetRule();
  await hybridConnectivityEndpointsPostListManagedProxyDetailsGeneratedByMinimumSetRule();
}

main().catch(console.error);
