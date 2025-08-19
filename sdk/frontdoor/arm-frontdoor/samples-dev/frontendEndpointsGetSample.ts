// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Frontend endpoint with the specified name within the specified Front Door.
 *
 * @summary Gets a Frontend endpoint with the specified name within the specified Front Door.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/FrontdoorFrontendEndpointGet.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getFrontendEndpoint(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const frontDoorName = "frontDoor1";
  const frontendEndpointName = "frontendEndpoint1";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontendEndpoints.get(
    resourceGroupName,
    frontDoorName,
    frontendEndpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFrontendEndpoint();
}

main().catch(console.error);
