// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables a frontendEndpoint for HTTPS traffic
 *
 * @summary disables a frontendEndpoint for HTTPS traffic
 * x-ms-original-file: 2025-10-01/FrontdoorDisableHttps.json
 */
async function frontendEndpointsDisableHttps() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.frontendEndpoints.disableHttps("rg1", "frontDoor1", "frontendEndpoint1");
}

async function main() {
  await frontendEndpointsDisableHttps();
}

main().catch(console.error);
