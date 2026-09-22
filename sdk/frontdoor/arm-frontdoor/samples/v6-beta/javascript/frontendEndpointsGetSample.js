// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Frontend endpoint with the specified name within the specified Front Door.
 *
 * @summary gets a Frontend endpoint with the specified name within the specified Front Door.
 * x-ms-original-file: 2025-11-01/FrontdoorFrontendEndpointGet.json
 */
async function getFrontendEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontendEndpoints.get("rg1", "frontDoor1", "frontendEndpoint1");
  console.log(result);
}

async function main() {
  await getFrontendEndpoint();
}

main().catch(console.error);
