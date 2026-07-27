// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list available regions by cluster tier for the project.
 *
 * @summary list available regions by cluster tier for the project.
 * x-ms-original-file: 2026-03-01-preview/Projects_ListClusterTierRegions_MaximumSet_Gen.json
 */
async function projectsListClusterTierRegionsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.projects.listClusterTierRegions(
    "rgopenapi",
    "myOrganization",
    "myProject",
  );
  console.log(result);
}

async function main() {
  await projectsListClusterTierRegionsMaximumSet();
}

main().catch(console.error);
