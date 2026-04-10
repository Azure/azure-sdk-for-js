// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Connection resource.
 *
 * @summary gets a Connection resource.
 * x-ms-original-file: 2025-12-01/Connections_Get.json
 */
async function connectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.connections.get(
    "examples-rg",
    "examples-storageMoverName",
    "example-connection",
  );
  console.log(result);
}

async function main() {
  await connectionsGet();
}

main().catch(console.error);
