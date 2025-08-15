// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a Traffic Manager endpoint.
 *
 * @summary Deletes a Traffic Manager endpoint.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Endpoint-DELETE-External.json
 */
async function endpointDeleteExternal(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["TRAFFICMANAGER_RESOURCE_GROUP"] || "azuresdkfornetautoresttrafficmanager1421";
  const profileName = "azsmnet6386";
  const endpointType = "ExternalEndpoints";
  const endpointName = "azsmnet7187";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.delete(
    resourceGroupName,
    profileName,
    endpointType,
    endpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointDeleteExternal();
}

main().catch(console.error);
