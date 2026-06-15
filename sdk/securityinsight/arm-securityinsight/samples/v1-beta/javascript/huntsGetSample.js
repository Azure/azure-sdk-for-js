// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a hunt, without relations and comments.
 *
 * @summary gets a hunt, without relations and comments.
 * x-ms-original-file: 2025-07-01-preview/hunts/GetHuntById.json
 */
async function getAHunt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.hunts.get(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
  );
  console.log(result);
}

async function main() {
  await getAHunt();
}

main().catch(console.error);
