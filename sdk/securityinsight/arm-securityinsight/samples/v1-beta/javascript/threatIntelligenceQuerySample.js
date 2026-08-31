// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all TI objects for the workspace.
 *
 * @summary gets all TI objects for the workspace.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/PostThreatIntelligenceQuery.json
 */
async function getTIObjects() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.threatIntelligence.query("myRg", "myWorkspace", "main")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTIObjects();
}

main().catch(console.error);
