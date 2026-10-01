// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status
 *
 * @summary lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status
 * x-ms-original-file: 2025-05-01/ChildAvailabilityStatuses_List.json
 */
async function getChildHealthHistoryByResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.childAvailabilityStatuses.list(
    "subscriptions/227b734f-e14f-4de6-b7fc-3190c21e69f6/resourceGroups/JUHACKETRHCTEST/providers/Microsoft.Compute/virtualMachineScaleSets/rhctest/virtualMachines/4",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getChildHealthHistoryByResource();
}

main().catch(console.error);
