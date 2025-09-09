// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Endpoints in a Storage Mover.
 *
 * @summary lists all Endpoints in a Storage Mover.
 * x-ms-original-file: 2025-07-01/Endpoints_List.json
 */
async function endpointsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoints.list("examples-rg", "examples-storageMoverName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await endpointsList();
}

main().catch(console.error);
