// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the regions and skus that are available for RI purchase for the specified Azure subscription.
 *
 * @summary get the regions and skus that are available for RI purchase for the specified Azure subscription.
 * x-ms-original-file: 2022-11-01/GetCatalog.json
 */
async function catalog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.getCatalog("23bc208b-083f-4901-ae85-4f98c0c3b4b6", {
    reservedResourceType: "VirtualMachines",
    location: "eastus",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await catalog();
}

main().catch(console.error);
