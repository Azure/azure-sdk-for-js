// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all remote flows that have not yet been linked to local flows
 *
 * @summary lists all remote flows that have not yet been linked to local flows
 * x-ms-original-file: 2026-02-06-preview/listPendingFlows.json
 */
async function listsAListOfPendingFlows() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connections.listPendingFlowsList("testRG", "testConnection")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAListOfPendingFlows();
}

main().catch(console.error);
