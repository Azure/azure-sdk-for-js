// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { FabricClient } = require("@azure/arm-fabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2023-11-01/Operations_List.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new FabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listOperations();
}

main().catch(console.error);
