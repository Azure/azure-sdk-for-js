// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to suspend operation of the specified Fabric capacity instance.
 *
 * @summary suspend operation of the specified Fabric capacity instance.
 * x-ms-original-file: 2023-11-01/FabricCapacities_Suspend.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function suspendCapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  await client.fabricCapacities.suspend("TestRG", "azsdktest");
}

async function main(): Promise<void> {
  await suspendCapacity();
}

main().catch(console.error);
