// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the count of all TI objects for the workspace.
 *
 * @summary gets the count of all TI objects for the workspace.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/PostThreatIntelligenceCount.json
 */
async function getTIObjectCount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligence.count("myRg", "myWorkspace", "main");
  console.log(result);
}

async function main() {
  await getTIObjectCount();
}

main().catch(console.error);
