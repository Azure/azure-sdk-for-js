// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AtlasClient } from "@azure/arm-mongodbatlas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Project
 *
 * @summary create a Project
 * x-ms-original-file: 2026-03-01-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json
 */
async function projectsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rgopenapi", "myOrganization", "myProject", {
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
