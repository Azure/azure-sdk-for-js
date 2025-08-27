// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to implements local CheckNameAvailability operations
 *
 * @summary implements local CheckNameAvailability operations
 * x-ms-original-file: 2023-11-01/FabricCapacities_CheckNameAvailability.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function checkNameAvailabilityOfACapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.checkNameAvailability("westcentralus", {
    name: "azsdktest",
    type: "Microsoft.Fabric/capacities",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailabilityOfACapacity();
}

main().catch(console.error);
