// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Project resources by OrganizationResource
 *
 * @summary list Project resources by OrganizationResource
 * x-ms-original-file: 2026-03-01-preview/Projects_List_MaximumSet_Gen.json
 */
async function projectsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.list("rgopenapi", "myOrganization")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectsListMaximumSet();
}

main().catch(console.error);
