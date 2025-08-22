// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to creates a new user or updates an existing user on a mongo cluster.
 *
 * @summary creates a new user or updates an existing user on a mongo cluster.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_UserCreateOrUpdate.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

async function createsAUserOnAMongoClusterResource(): Promise<void> {
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
        identityProvider: {
          type: "MicrosoftEntraID",
          properties: { principalType: "user" },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAUserOnAMongoClusterResource();
}

main().catch(console.error);
