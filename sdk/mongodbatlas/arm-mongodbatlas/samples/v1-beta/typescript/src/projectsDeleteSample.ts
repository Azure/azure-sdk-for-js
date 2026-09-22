// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AtlasClient } from "@azure/arm-mongodbatlas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Project
 *
 * @summary delete a Project
 * x-ms-original-file: 2026-03-01-preview/Projects_Delete_MaximumSet_Gen.json
 */
async function projectsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  await client.projects.delete("rgopenapi", "myOrganization", "myProject");
}

async function main(): Promise<void> {
  await projectsDeleteMaximumSet();
}

main().catch(console.error);
