// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a VnetConnection.
 *
 * @summary create or update a VnetConnection.
 * x-ms-original-file: 2026-07-01/VnetConnections_CreateOrUpdate.json
 */
async function createOrUpdateAVnetConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.vnetConnections.createOrUpdate(
    "myRg",
    "testgroup",
    "myVnetConnection",
    {
      properties: {
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRg/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAVnetConnection();
}

main().catch(console.error);
