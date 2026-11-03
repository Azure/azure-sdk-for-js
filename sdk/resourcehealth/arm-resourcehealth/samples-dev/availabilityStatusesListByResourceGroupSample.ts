// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the current availability status for all the resources in the resource group.
 *
 * @summary lists the current availability status for all the resources in the resource group.
 * x-ms-original-file: 2025-05-01/AvailabilityStatuses_ListByResourceGroup.json
 */
async function listByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilityStatuses.listByResourceGroup("resourceGroupName", {
    expand: "recommendedactions",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listByResourceGroup();
}

main().catch(console.error);
