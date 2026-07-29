// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VirtualMachine resources of a LaunchBulkInstancesOperation.
 *
 * @summary list VirtualMachine resources of a LaunchBulkInstancesOperation.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_ListVirtualMachines_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationListVirtualMachinesExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.launchBulkInstancesOperation.listVirtualMachines(
    "rgBulkactions",
    "useast2euap",
    "b038ec94-0860-42a5-b149-f1ce5f144e15",
    { filter: "onywxjwswbhlbkbbusgmkfgabdku", skiptoken: "tcbhwfqtoiwnlbjdbsnukxpgpa" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await launchBulkInstancesOperationListVirtualMachinesExample();
}

main().catch(console.error);
