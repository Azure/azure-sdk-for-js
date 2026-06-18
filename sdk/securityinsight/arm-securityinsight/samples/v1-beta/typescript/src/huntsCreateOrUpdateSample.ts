// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a hunt
 *
 * @summary create or update a hunt
 * x-ms-original-file: 2025-07-01-preview/hunts/CreateHunt.json
 */
async function createsOrUpdatesAHunt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.hunts.createOrUpdate(
    "myRg",
    "myWorkspace",
    "163e7b2a-a2ec-4041-aaba-d878a38f265f",
    {
      description: "Log4J Hunt Description",
      attackTactics: ["Reconnaissance"],
      attackTechniques: ["T1595"],
      displayName: "Log4J new hunt",
      hypothesisStatus: "Unknown",
      labels: ["Label1", "Label2"],
      owner: { objectId: "873b5263-5d34-4149-b356-ad341b01e123" },
      status: "New",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAHunt();
}

main().catch(console.error);
