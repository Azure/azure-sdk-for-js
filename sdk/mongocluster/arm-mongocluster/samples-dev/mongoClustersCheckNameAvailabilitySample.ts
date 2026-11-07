// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if DocumentDB cluster name is available for use.
 *
 * @summary check if DocumentDB cluster name is available for use.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_NameAvailability.json
 */
async function checksAndConfirmsTheDocumentDBClusterNameIsAvailableForUse(): Promise<void> {
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
 * This sample demonstrates how to check if DocumentDB cluster name is available for use.
 *
 * @summary check if DocumentDB cluster name is available for use.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_NameAvailability_AlreadyExists.json
 */
async function checksAndReturnsThatTheDocumentDBClusterNameIsAlreadyInUse(): Promise<void> {
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
  await checksAndConfirmsTheDocumentDBClusterNameIsAvailableForUse();
  await checksAndReturnsThatTheDocumentDBClusterNameIsAlreadyInUse();
}

main().catch(console.error);
