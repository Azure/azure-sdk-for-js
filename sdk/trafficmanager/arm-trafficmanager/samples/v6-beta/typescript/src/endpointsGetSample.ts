// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Traffic Manager endpoint.
 *
 * @summary gets a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-GET-External-WithGeoMapping.json
 */
async function endpointGETExternalWithGeoMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "azuresdkfornetautoresttrafficmanager2191",
    "azuresdkfornetautoresttrafficmanager8224",
    "ExternalEndpoints",
    "My%20external%20endpoint",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Traffic Manager endpoint.
 *
 * @summary gets a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-GET-External-WithLocation.json
 */
async function endpointGETExternalWithLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    "ExternalEndpoints",
    "azsmnet7187",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Traffic Manager endpoint.
 *
 * @summary gets a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-GET-External-WithSubnetMapping.json
 */
async function endpointGETExternalWithSubnetMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "azuresdkfornetautoresttrafficmanager2191",
    "azuresdkfornetautoresttrafficmanager8224",
    "ExternalEndpoints",
    "My%20external%20endpoint",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointGETExternalWithGeoMapping();
  await endpointGETExternalWithLocation();
  await endpointGETExternalWithSubnetMapping();
}

main().catch(console.error);
