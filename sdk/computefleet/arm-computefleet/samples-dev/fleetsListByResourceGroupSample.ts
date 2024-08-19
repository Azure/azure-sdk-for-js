// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Fleet resources by resource group
 *
 * @summary list Fleet resources by resource group
 * x-ms-original-file: 2024-05-01-preview/Fleets_ListByResourceGroup.json
 */
async function fleetsListByResourceGroup(): void {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.fleets.listByResourceGroup("rgazurefleet")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  fleetsListByResourceGroup();
}

main().catch(console.error);
