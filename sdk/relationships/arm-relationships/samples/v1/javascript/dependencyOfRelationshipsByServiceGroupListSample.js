// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DependencyOfRelationship resources by scope
 *
 * @summary list DependencyOfRelationship resources by scope
 * x-ms-original-file: 2026-08-01/DependencyOfRelationshipsByServiceGroup_List.json
 */
async function dependencyOfRelationshipsByServiceGroupList() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const resArray = new Array();
  for await (const item of client.dependencyOfRelationshipsByServiceGroup.list("myServiceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dependencyOfRelationshipsByServiceGroupList();
}

main().catch(console.error);
