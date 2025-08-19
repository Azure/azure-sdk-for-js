// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurgeParameters } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Removes a content from Front Door.
 *
 * @summary Removes a content from Front Door.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/FrontdoorPurgeContent.json
 */
async function purgeContentFromFrontDoor(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const frontDoorName = "frontDoor1";
  const contentFilePaths: PurgeParameters = {
    contentPaths: ["/pictures.aspx", "/pictures/*"],
  };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.endpoints.beginPurgeContentAndWait(
    resourceGroupName,
    frontDoorName,
    contentFilePaths,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await purgeContentFromFrontDoor();
}

main().catch(console.error);
