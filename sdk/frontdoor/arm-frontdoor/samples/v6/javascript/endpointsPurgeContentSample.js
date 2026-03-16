// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes a content from Front Door.
 *
 * @summary removes a content from Front Door.
 * x-ms-original-file: 2025-10-01/FrontdoorPurgeContent.json
 */
async function purgeContentFromFrontDoor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.endpoints.purgeContent("rg1", "frontDoor1", {
    contentPaths: ["/pictures.aspx", "/pictures/*"],
  });
}

async function main() {
  await purgeContentFromFrontDoor();
}

main().catch(console.error);
