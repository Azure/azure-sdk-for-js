// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the endpoint access credentials to the resource.
 *
 * @summary gets the endpoint access credentials to the resource.
 * x-ms-original-file: 2024-12-01/EndpointsPostListCredentials.json
 */
async function hybridConnectivityEndpointsPostListCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.endpoints.Endpoints_listCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "default",
    { ListCredentialsRequest: { serviceName: "SSH" }, expiresin: 10800 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsPostListCredentials();
}

main().catch(console.error);
