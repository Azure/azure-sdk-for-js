// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Connections in a Storage Mover.
 *
 * @summary lists all Connections in a Storage Mover.
 * x-ms-original-file: 2025-12-01/Connections_List.json
 */
async function connectionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connections.list("examples-rg", "examples-storageMoverName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await connectionsList();
}

main().catch(console.error);
