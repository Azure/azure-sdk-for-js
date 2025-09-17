// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a FabricCapacity
 *
 * @summary update a FabricCapacity
 * x-ms-original-file: 2023-11-01/FabricCapacities_Update.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function updateCapacityProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.update("TestRG", "azsdktest", {
    sku: { name: "F8", tier: "Fabric" },
    tags: { testKey: "testValue" },
    properties: { administration: { members: ["azsdktest2@microsoft.com"] } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCapacityProperties();
}

main().catch(console.error);
