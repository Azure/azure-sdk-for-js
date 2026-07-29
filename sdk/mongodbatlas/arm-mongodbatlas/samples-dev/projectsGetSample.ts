// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AtlasClient } from "@azure/arm-mongodbatlas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Project
 *
 * @summary get a Project
 * x-ms-original-file: 2026-03-01-preview/Projects_Get_MaximumSet_Gen.json
 */
async function projectsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.projects.get("rgopenapi", "myOrganization", "myProject");
  console.log(result);
}

async function main(): Promise<void> {
  await projectsGetMaximumSet();
}

main().catch(console.error);
