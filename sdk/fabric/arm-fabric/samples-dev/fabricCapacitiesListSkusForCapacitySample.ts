// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list eligible SKUs for a Microsoft Fabric resource
 *
 * @summary list eligible SKUs for a Microsoft Fabric resource
 * x-ms-original-file: 2023-11-01/FabricCapacities_ListSkusForCapacity.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function listEligibleSKUsForAnExistingCapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fabricCapacities.listSkusForCapacity("TestRG", "azsdktest")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEligibleSKUsForAnExistingCapacity();
}

main().catch(console.error);
