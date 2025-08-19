// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Disables a frontendEndpoint for HTTPS traffic
 *
 * @summary Disables a frontendEndpoint for HTTPS traffic
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/FrontdoorDisableHttps.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function frontendEndpointsDisableHttps(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const frontDoorName = "frontDoor1";
  const frontendEndpointName = "frontendEndpoint1";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontendEndpoints.beginDisableHttpsAndWait(
    resourceGroupName,
    frontDoorName,
    frontendEndpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await frontendEndpointsDisableHttps();
}

main().catch(console.error);
