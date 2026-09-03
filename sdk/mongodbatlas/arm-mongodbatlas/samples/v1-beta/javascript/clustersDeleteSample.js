// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Cluster
 *
 * @summary delete a Cluster
 * x-ms-original-file: 2026-03-01-preview/Clusters_Delete_MaximumSet_Gen.json
 */
async function clustersDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  await client.clusters.delete("rgopenapi", "myOrganization", "myProject", "myCluster");
}

async function main() {
  await clustersDeleteMaximumSet();
}

main().catch(console.error);
