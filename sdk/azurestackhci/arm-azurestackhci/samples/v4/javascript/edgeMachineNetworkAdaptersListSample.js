// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all network adapters on an Edge Machine.
 *
 * @summary list all network adapters on an Edge Machine.
 * x-ms-original-file: 2026-10-01/EdgeMachineNetworkAdapters_List.json
 */
async function edgeMachineNetworkAdaptersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachineNetworkAdapters.list("test-rg", "EdgeMachine01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await edgeMachineNetworkAdaptersList();
}

main().catch(console.error);
