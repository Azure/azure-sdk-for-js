// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a hunt comment
 *
 * @summary gets a hunt comment
 * x-ms-original-file: 2025-07-01-preview/hunts/GetHuntCommentById.json
 */
async function getAHuntComment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.huntComments.get(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
  );
  console.log(result);
}

async function main() {
  await getAHuntComment();
}

main().catch(console.error);
