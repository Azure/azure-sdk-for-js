// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update certain properties of the Network Interface resource.
 *
 * @summary update certain properties of the Network Interface resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_Update.json
 */
async function networkInterfacesUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkInterfaces.update(
    "example-rg",
    "example-device",
    "example-interface",
    {
      properties: {
        annotation: "annotation",
        description: "device 1",
        additionalDescription: "device 1",
      },
    },
  );
  console.log(result);
}

async function main() {
  await networkInterfacesUpdateMaximumSetGen();
}

main().catch(console.error);
