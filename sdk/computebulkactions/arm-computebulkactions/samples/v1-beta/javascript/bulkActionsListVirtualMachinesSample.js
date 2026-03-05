// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeBulkActionsClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VirtualMachine resources of a LaunchBulkInstancesOperation.
 *
 * @summary list VirtualMachine resources of a LaunchBulkInstancesOperation.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_ListVirtualMachines_MaximumSet_Gen.json
 */
async function bulkActionsListVirtualMachinesGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkActions.listVirtualMachines(
    "rgcomputebulkactions",
    "eastus2euap",
    "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B",
    { filter: "elxwdbimmgosmnb", skiptoken: "nrcv" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bulkActionsListVirtualMachinesGeneratedByMaximumSetRule();
}

main().catch(console.error);
