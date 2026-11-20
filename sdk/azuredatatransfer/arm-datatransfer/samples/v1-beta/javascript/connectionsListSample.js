// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all pending remote connections that are linkable to this connection.
 *
 * @summary lists all pending remote connections that are linkable to this connection.
 * x-ms-original-file: 2026-02-06-preview/listPendingConnections.json
 */
async function listsAListOfPendingConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connections.list("testRG", "testConnection")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAListOfPendingConnections();
}

main().catch(console.error);
