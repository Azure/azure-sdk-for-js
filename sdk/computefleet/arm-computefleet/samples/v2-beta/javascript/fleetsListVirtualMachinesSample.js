// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureFleetClient } = require("@azure/arm-computefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VirtualMachine resources of a Launch mode Fleet.
 *
 * @summary list VirtualMachine resources of a Launch mode Fleet.
 * x-ms-original-file: 2026-04-01-preview/Fleets_ListVirtualMachines_MaximumSet_Gen.json
 */
async function fleetsListVirtualMachinesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8F7446E8-AD7B-4D50-989A-2504374B8462";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listVirtualMachines("rgazurefleet", "testFleet", {
    filter: "qppsnaauhedxu",
    skiptoken: "jxgpugummyphgx",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fleetsListVirtualMachinesMaximumSetGen();
}

main().catch(console.error);
