// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by disconnected operation.
 *
 * @summary list by disconnected operation.
 * x-ms-original-file: 2025-06-01-preview/Images_ListByDisconnectedOperation_MaximumSet_Gen.json
 */
async function imagesListByDisconnectedOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1F6CACA0-5FFA-47AD-94FD-42368F71E49E";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.images.listByDisconnectedOperation(
    "rgdisconnectedoperations",
    "w_-EG-3-euL7K3-E",
    { filter: "toynendoobwkrcwmfdfup", top: 20, skip: 3 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await imagesListByDisconnectedOperation();
}

main().catch(console.error);
