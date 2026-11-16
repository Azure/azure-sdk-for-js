// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DependencyOfRelationship
 *
 * @summary delete a DependencyOfRelationship
 * x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_Delete.json
 */
async function dependencyOfRelationshipsByServiceGroupDelete() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  await client.dependencyOfRelationshipsByServiceGroup.delete("myServiceGroup", "relationshipOne");
}

async function main() {
  await dependencyOfRelationshipsByServiceGroupDelete();
}

main().catch(console.error);
