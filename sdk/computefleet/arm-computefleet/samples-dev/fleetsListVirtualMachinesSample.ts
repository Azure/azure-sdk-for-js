// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list VirtualMachine resources of an instance Fleet.
 *
 * @summary list VirtualMachine resources of an instance Fleet.
 * x-ms-original-file: 2025-07-01-preview/Fleets_ListVirtualMachines.json
 */
async function fleetsListVirtualMachinesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3453D930-6DDF-4466-B3B3-E1AEE9BD448C";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listVirtualMachines("rgazurefleet", "myFleet", {
    filter: "xzcepyottghqa",
    skiptoken: "hydepbmwuypaprlphcdecsz",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fleetsListVirtualMachinesMaximumSet();
}

main().catch(console.error);
