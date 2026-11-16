// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DependencyOfRelationship
 *
 * @summary get a DependencyOfRelationship
 * x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_Get.json
 */
async function dependencyOfRelationshipsByServiceGroupGet() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const result = await client.dependencyOfRelationshipsByServiceGroup.get(
    "myServiceGroup",
    "relationshipOne",
  );
  console.log(result);
}

async function main() {
  await dependencyOfRelationshipsByServiceGroupGet();
}

main().catch(console.error);
