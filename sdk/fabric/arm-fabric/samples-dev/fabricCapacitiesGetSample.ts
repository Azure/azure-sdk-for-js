// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a FabricCapacity
 *
 * @summary get a FabricCapacity
 * x-ms-original-file: 2023-11-01/FabricCapacities_Get.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function getACapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.get("TestRG", "azsdktest");
  console.log(result);
}

async function main(): Promise<void> {
  await getACapacity();
}

main().catch(console.error);
