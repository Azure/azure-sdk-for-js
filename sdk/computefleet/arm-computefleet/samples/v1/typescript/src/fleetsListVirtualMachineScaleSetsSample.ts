// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list VirtualMachineScaleSet resources by Fleet
 *
 * @summary list VirtualMachineScaleSet resources by Fleet
 * x-ms-original-file: 2024-11-01/Fleets_ListVirtualMachineScaleSets.json
 */
async function fleetsListVirtualMachineScaleSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.fleets.listVirtualMachineScaleSets(
    "rgazurefleet",
    "myFleet",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  fleetsListVirtualMachineScaleSets();
}

main().catch(console.error);
