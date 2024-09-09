// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to suspend operation of the specified Fabric capacity instance.
 *
 * @summary suspend operation of the specified Fabric capacity instance.
 * x-ms-original-file: 2023-11-01/FabricCapacities_Suspend.json
 */
async function suspendCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.suspend("TestRG", "azsdktest");
  console.log(result);
}

async function main() {
  suspendCapacity();
}

main().catch(console.error);
