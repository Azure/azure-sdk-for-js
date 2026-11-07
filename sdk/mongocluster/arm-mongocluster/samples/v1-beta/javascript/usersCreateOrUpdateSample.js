// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new user or updates an existing user on a DocumentDB cluster.
 *
 * @summary creates a new user or updates an existing user on a DocumentDB cluster.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_UserCreateOrUpdate.json
 */
async function createsAUserOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.users.createOrUpdate(
    "TestGroup",
    "myMongoCluster",
    "uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu",
    {
      properties: {
        roles: [{ role: "root", db: "admin" }],
        identityProvider: { type: "MicrosoftEntraID", properties: { principalType: "user" } },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createsAUserOnADocumentDBClusterResource();
}

main().catch(console.error);
