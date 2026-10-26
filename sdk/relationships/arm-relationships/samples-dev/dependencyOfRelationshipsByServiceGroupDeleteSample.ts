// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DependencyOfRelationship
 *
 * @summary delete a DependencyOfRelationship
 * x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_Delete.json
 */
async function dependencyOfRelationshipsByServiceGroupDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  await client.dependencyOfRelationshipsByServiceGroup.delete("myServiceGroup", "relationshipOne");
}

async function main(): Promise<void> {
  await dependencyOfRelationshipsByServiceGroupDelete();
}

main().catch(console.error);
