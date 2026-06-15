// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list VirtualMachineScaleSet resources by Fleet
 *
 * @summary list VirtualMachineScaleSet resources by Fleet
 * x-ms-original-file: 2026-04-01-preview/Fleets_ListVirtualMachineScaleSets_MaximumSet_Gen.json
 */
async function fleetsListVirtualMachineScaleSetsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listVirtualMachineScaleSets("rgazurefleet", "myFleet")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fleetsListVirtualMachineScaleSetsMaximumSetGen();
}

main().catch(console.error);
