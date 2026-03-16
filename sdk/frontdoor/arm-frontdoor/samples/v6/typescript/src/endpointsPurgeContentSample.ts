// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes a content from Front Door.
 *
 * @summary removes a content from Front Door.
 * x-ms-original-file: 2025-10-01/FrontdoorPurgeContent.json
 */
async function purgeContentFromFrontDoor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.endpoints.purgeContent("rg1", "frontDoor1", {
    contentPaths: ["/pictures.aspx", "/pictures/*"],
  });
}

async function main(): Promise<void> {
  await purgeContentFromFrontDoor();
}

main().catch(console.error);
