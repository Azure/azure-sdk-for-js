// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all TI objects for the workspace.
 *
 * @summary gets all TI objects for the workspace.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/PostThreatIntelligenceQuery.json
 */
async function getTIObjects(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.threatIntelligence.query("myRg", "myWorkspace", "main")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTIObjects();
}

main().catch(console.error);
