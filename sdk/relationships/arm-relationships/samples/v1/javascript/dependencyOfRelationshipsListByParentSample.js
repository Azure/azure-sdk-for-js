// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DependencyOfRelationship resources by parent
 *
 * @summary list DependencyOfRelationship resources by parent
 * x-ms-original-file: 2026-08-01/DependencyOfRelationships_ListByParent.json
 */
async function dependencyOfRelationshipsListByParent() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const resArray = new Array();
  for await (const item of client.dependencyOfRelationships.listByParent(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dependencyOfRelationshipsListByParent();
}

main().catch(console.error);
