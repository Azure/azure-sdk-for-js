// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Connection resource.
 *
 * @summary creates or updates a Connection resource.
 * x-ms-original-file: 2025-12-01/Connections_CreateOrUpdate.json
 */
async function connectionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.connections.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "example-connection",
    {
      properties: {
        description: "Example Connection Description",
        privateLinkServiceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.Network/privateLinkServices/example-pls",
      },
    },
  );
  console.log(result);
}

async function main() {
  await connectionsCreateOrUpdate();
}

main().catch(console.error);
