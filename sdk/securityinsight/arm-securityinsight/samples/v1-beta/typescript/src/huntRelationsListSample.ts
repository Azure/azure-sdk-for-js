// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all hunt relations
 *
 * @summary gets all hunt relations
 * x-ms-original-file: 2025-07-01-preview/hunts/GetHuntRelations.json
 */
async function getAllHuntRelations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.huntRelations.list(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllHuntRelations();
}

main().catch(console.error);
