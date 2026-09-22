// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the Front Doors within an Azure subscription.
 *
 * @summary lists all of the Front Doors within an Azure subscription.
 * x-ms-original-file: 2025-11-01/FrontdoorListAll.json
 */
async function listAllFrontDoors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.frontDoors.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllFrontDoors();
}

main().catch(console.error);
