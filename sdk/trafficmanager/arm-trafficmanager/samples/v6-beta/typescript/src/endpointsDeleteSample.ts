// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Traffic Manager endpoint.
 *
 * @summary deletes a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-DELETE-External.json
 */
async function endpointDeleteExternal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.delete(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    "ExternalEndpoints",
    "azsmnet7187",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointDeleteExternal();
}

main().catch(console.error);
