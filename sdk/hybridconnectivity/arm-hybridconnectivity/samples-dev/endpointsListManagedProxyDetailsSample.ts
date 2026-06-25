// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the managed proxy details
 *
 * @summary fetches the managed proxy details
 * x-ms-original-file: 2024-12-01/EndpointsPostListManagedProxyDetails.json
 */
async function hybridConnectivityEndpointsPostListManagedProxyDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listManagedProxyDetails(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/arcGroup/providers/Microsoft.Compute/virtualMachines/vm00006",
    "default",
    { hostname: "r.proxy.arc.com", service: "127.0.0.1:65035", serviceName: "WAC" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsPostListManagedProxyDetails();
}

main().catch(console.error);
