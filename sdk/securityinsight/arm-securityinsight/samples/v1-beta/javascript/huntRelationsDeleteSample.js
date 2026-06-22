// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a hunt relation.
 *
 * @summary delete a hunt relation.
 * x-ms-original-file: 2025-07-01-preview/hunts/DeleteHuntRelation.json
 */
async function deleteAHuntRelation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.huntRelations.delete(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
  );
}

async function main() {
  await deleteAHuntRelation();
}

main().catch(console.error);
