// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to limits constraining certain resource properties.
 *
 * @summary limits constraining certain resource properties.
 * x-ms-original-file: 2024-11-01/Reservations_GetResourceLimits_MaximumSet_Gen.json
 */
async function reservationsGetResourceLimits(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.getResourceLimits("rgpurestorage", "storagePoolname");
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsGetResourceLimits();
}

main().catch(console.error);
