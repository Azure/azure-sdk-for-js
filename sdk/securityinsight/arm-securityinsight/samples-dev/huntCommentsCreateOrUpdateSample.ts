// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a hunt relation.
 *
 * @summary creates or updates a hunt relation.
 * x-ms-original-file: 2025-07-01-preview/hunts/CreateHuntComment.json
 */
async function createsOrUpdatesAHuntComment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.huntComments.createOrUpdate(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
    { message: "This is a test comment." },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAHuntComment();
}

main().catch(console.error);
