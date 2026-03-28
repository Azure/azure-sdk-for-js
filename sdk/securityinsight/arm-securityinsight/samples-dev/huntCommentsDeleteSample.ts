// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a hunt comment.
 *
 * @summary delete a hunt comment.
 * x-ms-original-file: 2025-07-01-preview/hunts/DeleteHuntComment.json
 */
async function deleteAHuntComment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.huntComments.delete(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
    "2216d0e1-91e3-4902-89fd-d2df8c123456",
  );
}

async function main(): Promise<void> {
  await deleteAHuntComment();
}

main().catch(console.error);
