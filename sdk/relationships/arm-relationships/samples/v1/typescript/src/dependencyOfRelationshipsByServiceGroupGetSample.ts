// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DependencyOfRelationship
 *
 * @summary get a DependencyOfRelationship
 * x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_Get.json
 */
async function dependencyOfRelationshipsByServiceGroupGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const result = await client.dependencyOfRelationshipsByServiceGroup.get(
    "myServiceGroup",
    "relationshipOne",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dependencyOfRelationshipsByServiceGroupGet();
}

main().catch(console.error);
