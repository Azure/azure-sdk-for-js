// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EndpointResource, HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the endpoint to the target resource.
 *
 * @summary create or update the endpoint to the target resource.
 * x-ms-original-file: 2024-12-01/EndpointsPutCustom.json
 */
async function hybridConnectivityEndpointsPutCustom(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const endpointResource: EndpointResource = {
    properties: { type: "default" },
  };
  const result = await client.endpoints.createOrUpdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "custom",
    endpointResource
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the endpoint to the target resource.
 *
 * @summary create or update the endpoint to the target resource.
 * x-ms-original-file: 2024-12-01/EndpointsPutDefault.json
 */
async function hybridConnectivityEndpointsPutDefault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const endpointResource: EndpointResource = {
    properties: { type: "default" },
  };
  const result = await client.endpoints.createOrUpdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "default",
    endpointResource
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hybridConnectivityEndpointsPutCustom();
  await hybridConnectivityEndpointsPutDefault();
}

main().catch(console.error);
