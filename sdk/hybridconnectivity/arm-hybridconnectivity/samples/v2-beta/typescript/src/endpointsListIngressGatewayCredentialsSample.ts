// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the ingress gateway endpoint credentials
 *
 * @summary gets the ingress gateway endpoint credentials
 * x-ms-original-file: 2024-12-01/EndpointsPostListIngressGatewayCredentials.json
 */
async function hybridConnectivityEndpointsPostListIngressGatewayCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.endpoints.listIngressGatewayCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/arcGroup/providers/Microsoft.ArcPlaceHolder/ProvisionedClusters/cluster0",
    "default",
    { expiresin: 10800 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsPostListIngressGatewayCredentials();
}

main().catch(console.error);
