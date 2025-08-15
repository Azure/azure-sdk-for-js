// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureFleetClient } = require("@azure/arm-computefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VirtualMachineScaleSet resources by Fleet
 *
 * @summary list VirtualMachineScaleSet resources by Fleet
 * x-ms-original-file: 2025-07-01-preview/Fleets_ListVirtualMachineScaleSets.json
 */
async function fleetsListVirtualMachineScaleSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listVirtualMachineScaleSets("rgazurefleet", "myFleet")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fleetsListVirtualMachineScaleSets();
}

main().catch(console.error);
