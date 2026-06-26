// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDB parameter group.
 *
 * @summary gets information about a HorizonDB parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_Get.json
 */
async function getAHorizonDBParameterGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbParameterGroups.get(
    "exampleresourcegroup",
    "exampleparametergroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBParameterGroup();
}

main().catch(console.error);
