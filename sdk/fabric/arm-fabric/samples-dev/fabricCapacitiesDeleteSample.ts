// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a FabricCapacity
 *
 * @summary delete a FabricCapacity
 * x-ms-original-file: 2023-11-01/FabricCapacities_Delete.json
 */
async function deleteACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.delete("TestRG", "azsdktest");
  console.log(result);
}

async function main() {
  deleteACapacity();
}

main().catch(console.error);
