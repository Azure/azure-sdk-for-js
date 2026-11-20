// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets flows in a connection.
 *
 * @summary gets flows in a connection.
 * x-ms-original-file: 2026-02-06-preview/listFlowsByConnection.json
 */
async function getsFlowsInAConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.flows.listByConnection("testRG", "testConnection")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsFlowsInAConnection();
}

main().catch(console.error);
