// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Cluster resources by Project
 *
 * @summary list Cluster resources by Project
 * x-ms-original-file: 2026-03-01-preview/Clusters_List_MaximumSet_Gen.json
 */
async function clustersListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.list("rgopenapi", "myOrganization", "myProject")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clustersListMaximumSet();
}

main().catch(console.error);
