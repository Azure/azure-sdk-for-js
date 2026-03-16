// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Frontend endpoint with the specified name within the specified Front Door.
 *
 * @summary gets a Frontend endpoint with the specified name within the specified Front Door.
 * x-ms-original-file: 2025-10-01/FrontdoorFrontendEndpointGet.json
 */
async function getFrontendEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontendEndpoints.get("rg1", "frontDoor1", "frontendEndpoint1");
  console.log(result);
}

async function main(): Promise<void> {
  await getFrontendEndpoint();
}

main().catch(console.error);
