// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Front Door with the specified parameters.
 *
 * @summary deletes an existing Front Door with the specified parameters.
 * x-ms-original-file: 2025-11-01/FrontdoorDelete.json
 */
async function deleteFrontDoor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.frontDoors.delete("rg1", "frontDoor1");
}

async function main(): Promise<void> {
  await deleteFrontDoor();
}

main().catch(console.error);
