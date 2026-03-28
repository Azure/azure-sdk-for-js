// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a hunt.
 *
 * @summary delete a hunt.
 * x-ms-original-file: 2025-07-01-preview/hunts/DeleteHunt.json
 */
async function deleteAHunt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.hunts.delete("myRg", "myWorkspace", "163e7b2a-a2ec-4041-aaba-d878a38f265f");
}

async function main(): Promise<void> {
  await deleteAHunt();
}

main().catch(console.error);
