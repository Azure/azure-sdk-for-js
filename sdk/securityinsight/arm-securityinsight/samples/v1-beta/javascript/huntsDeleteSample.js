// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a hunt.
 *
 * @summary delete a hunt.
 * x-ms-original-file: 2025-07-01-preview/hunts/DeleteHunt.json
 */
async function deleteAHunt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.hunts.delete("myRg", "myWorkspace", "163e7b2a-a2ec-4041-aaba-d878a38f265f");
}

async function main() {
  await deleteAHunt();
}

main().catch(console.error);
