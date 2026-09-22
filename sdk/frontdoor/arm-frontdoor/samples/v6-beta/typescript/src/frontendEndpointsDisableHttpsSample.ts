// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables a frontendEndpoint for HTTPS traffic
 *
 * @summary disables a frontendEndpoint for HTTPS traffic
 * x-ms-original-file: 2025-11-01/FrontdoorDisableHttps.json
 */
async function frontendEndpointsDisableHttps(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.frontendEndpoints.disableHttps("rg1", "frontDoor1", "frontendEndpoint1");
}

async function main(): Promise<void> {
  await frontendEndpointsDisableHttps();
}

main().catch(console.error);
