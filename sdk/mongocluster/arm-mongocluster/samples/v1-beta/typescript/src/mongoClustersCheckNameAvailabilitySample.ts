// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if mongo cluster name is available for use.
 *
 * @summary check if mongo cluster name is available for use.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_NameAvailability.json
 */
async function checksAndConfirmsTheMongoClusterNameIsAvailabilityForUse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.checkNameAvailability("westus2", {
    name: "newmongocluster",
    type: "Microsoft.DocumentDB/mongoClusters",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to check if mongo cluster name is available for use.
 *
 * @summary check if mongo cluster name is available for use.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_NameAvailability_AlreadyExists.json
 */
async function checksAndReturnsThatTheMongoClusterNameIsAlreadyInUse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.checkNameAvailability("westus2", {
    name: "existingmongocluster",
    type: "Microsoft.DocumentDB/mongoClusters",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checksAndConfirmsTheMongoClusterNameIsAvailabilityForUse();
  await checksAndReturnsThatTheMongoClusterNameIsAlreadyInUse();
}

main().catch(console.error);
