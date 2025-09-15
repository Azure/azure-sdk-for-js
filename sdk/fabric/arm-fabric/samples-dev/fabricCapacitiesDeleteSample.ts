// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a FabricCapacity
 *
 * @summary delete a FabricCapacity
 * x-ms-original-file: 2023-11-01/FabricCapacities_Delete.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteACapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  await client.fabricCapacities.delete("TestRG", "azsdktest");
}

async function main(): Promise<void> {
  await deleteACapacity();
}

main().catch(console.error);
