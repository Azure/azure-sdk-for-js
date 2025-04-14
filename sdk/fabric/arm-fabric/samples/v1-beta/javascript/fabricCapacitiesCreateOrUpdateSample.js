// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { FabricClient } = require("@azure/arm-fabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FabricCapacity
 *
 * @summary create a FabricCapacity
 * x-ms-original-file: 2023-11-01/FabricCapacities_CreateOrUpdate.json
 */
async function createOrUpdateACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.createOrUpdate("TestRG", "azsdktest", {
    properties: {
      administration: {
        members: ["azsdktest@microsoft.com", "azsdktest2@microsoft.com"],
      },
    },
    sku: { name: "F2", tier: "Fabric" },
    location: "westcentralus",
  });
  console.log(result);
}

async function main() {
  createOrUpdateACapacity();
}

main().catch(console.error);
