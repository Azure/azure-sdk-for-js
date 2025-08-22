// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Traffic Manager endpoint.
 *
 * @summary Gets a Traffic Manager endpoint.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-GET-External-WithGeoMapping.json
 */

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function endpointGetExternalWithGeoMapping(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["TRAFFICMANAGER_RESOURCE_GROUP"] || "azuresdkfornetautoresttrafficmanager2191";
  const profileName = "azuresdkfornetautoresttrafficmanager8224";
  const endpointType = "ExternalEndpoints";
  const endpointName = "My%20external%20endpoint";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a Traffic Manager endpoint.
 *
 * @summary Gets a Traffic Manager endpoint.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-GET-External-WithLocation.json
 */
async function endpointGetExternalWithLocation(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["TRAFFICMANAGER_RESOURCE_GROUP"] || "azuresdkfornetautoresttrafficmanager1421";
  const profileName = "azsmnet6386";
  const endpointType = "ExternalEndpoints";
  const endpointName = "azsmnet7187";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a Traffic Manager endpoint.
 *
 * @summary Gets a Traffic Manager endpoint.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-GET-External-WithSubnetMapping.json
 */
async function endpointGetExternalWithSubnetMapping(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["TRAFFICMANAGER_RESOURCE_GROUP"] || "azuresdkfornetautoresttrafficmanager2191";
  const profileName = "azuresdkfornetautoresttrafficmanager8224";
  const endpointType = "ExternalEndpoints";
  const endpointName = "My%20external%20endpoint";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointGetExternalWithGeoMapping();
  await endpointGetExternalWithLocation();
  await endpointGetExternalWithSubnetMapping();
}

main().catch(console.error);
