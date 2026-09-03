// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DependencyOfRelationship
 *
 * @summary create a DependencyOfRelationship
 * x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_CreateOrUpdate.json
 */
async function dependencyOfRelationshipsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const result = await client.dependencyOfRelationships.createOrUpdate(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "relationshipOne",
    {
      properties: {
        targetId:
          "/subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg123/providers/Microsoft.Web/staticSites/test-site",
        targetTenant: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
    },
  );
  console.log(result);
}

async function main() {
  await dependencyOfRelationshipsCreateOrUpdate();
}

main().catch(console.error);
