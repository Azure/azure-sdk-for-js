// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDb parameter group.
 *
 * @summary deletes a HorizonDb parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_Delete.json
 */
async function deleteAHorizonDbParameterGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbParameterGroups.delete("exampleresourcegroup", "exampleparametergroup");
}

async function main(): Promise<void> {
  await deleteAHorizonDbParameterGroup();
}

main().catch(console.error);
