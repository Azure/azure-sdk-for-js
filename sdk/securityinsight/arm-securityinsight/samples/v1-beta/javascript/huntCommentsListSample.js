// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all hunt comments
 *
 * @summary gets all hunt comments
 * x-ms-original-file: 2025-07-01-preview/hunts/GetHuntComments.json
 */
async function getAllHuntComments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.huntComments.list(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllHuntComments();
}

main().catch(console.error);
