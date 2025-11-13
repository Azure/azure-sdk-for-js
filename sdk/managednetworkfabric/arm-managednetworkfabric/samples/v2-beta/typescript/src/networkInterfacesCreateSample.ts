// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Network Interface resource.
 *
 * @summary create a Network Interface resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_Create.json
 */
async function networkInterfacesCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkInterfaces.create(
    "example-rg",
    "example-device",
    "example-interface",
    {
      properties: {
        annotation: "annotation",
        interfaceType: "Management",
        description: "device 1",
        additionalDescription: "device 1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfacesCreateMaximumSetGen();
}

main().catch(console.error);
