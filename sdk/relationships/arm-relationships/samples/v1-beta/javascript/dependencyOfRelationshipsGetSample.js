// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DependencyOfRelationship
 *
 * @summary get a DependencyOfRelationship
 * x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_Get.json
 */
async function dependencyOfRelationshipsGet() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const result = await client.dependencyOfRelationships.get(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "relationshipOne",
  );
  console.log(result);
}

async function main() {
  await dependencyOfRelationshipsGet();
}

main().catch(console.error);
