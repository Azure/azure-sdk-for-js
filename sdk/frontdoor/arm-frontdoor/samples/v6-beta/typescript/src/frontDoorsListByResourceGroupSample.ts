// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the Front Doors within a resource group under a subscription.
 *
 * @summary lists all of the Front Doors within a resource group under a subscription.
 * x-ms-original-file: 2025-11-01/FrontdoorList.json
 */
async function listFrontDoorsInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.frontDoors.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFrontDoorsInAResourceGroup();
}

main().catch(console.error);
