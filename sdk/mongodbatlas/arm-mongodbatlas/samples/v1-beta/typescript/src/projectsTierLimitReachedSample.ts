// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AtlasClient } from "@azure/arm-mongodbatlas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if tier limit is reached for the project.
 *
 * @summary check if tier limit is reached for the project.
 * x-ms-original-file: 2026-03-01-preview/Projects_TierLimitReached_MaximumSet_Gen.json
 */
async function projectsTierLimitReachedMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.projects.tierLimitReached("rgopenapi", "myOrganization", "myProject");
  console.log(result);
}

async function main(): Promise<void> {
  await projectsTierLimitReachedMaximumSet();
}

main().catch(console.error);
