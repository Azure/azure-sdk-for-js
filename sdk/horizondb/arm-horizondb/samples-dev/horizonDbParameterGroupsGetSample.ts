// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDb parameter group.
 *
 * @summary gets information about a HorizonDb parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_Get.json
 */
async function getAHorizonDbParameterGroup(): Promise<void> {
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
  await getAHorizonDbParameterGroup();
}

main().catch(console.error);
