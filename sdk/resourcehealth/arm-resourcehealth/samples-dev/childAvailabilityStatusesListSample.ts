// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status
 *
 * @summary Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ChildAvailabilityStatuses_List.json
 */

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getChildHealthHistoryByResource(): Promise<void> {
  const resourceUri =
    "subscriptions/227b734f-e14f-4de6-b7fc-3190c21e69f6/resourceGroups/JUHACKETRHCTEST/providers/Microsoft.Compute/virtualMachineScaleSets/rhctest/virtualMachines/4";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.childAvailabilityStatuses.list(resourceUri)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getChildHealthHistoryByResource();
}

main().catch(console.error);
