// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Project
 *
 * @summary get a Project
 * x-ms-original-file: 2026-03-01-preview/Projects_Get_MaximumSet_Gen.json
 */
async function projectsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.projects.get("rgopenapi", "myOrganization", "myProject");
  console.log(result);
}

async function main() {
  await projectsGetMaximumSet();
}

main().catch(console.error);
