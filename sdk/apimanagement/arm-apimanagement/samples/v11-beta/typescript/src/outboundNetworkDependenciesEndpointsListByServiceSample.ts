// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the network endpoints of all outbound dependencies of a ApiManagement service.
 *
 * @summary gets the network endpoints of all outbound dependencies of a ApiManagement service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetOutboundNetworkDependenciesEndpoints.json
 */
async function apiManagementServiceGetOutboundNetworkDependenciesEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.outboundNetworkDependenciesEndpoints.listByService(
    "rg1",
    "apimService1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceGetOutboundNetworkDependenciesEndpoints();
}

main().catch(console.error);
