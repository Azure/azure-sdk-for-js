// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ServiceGroupMemberRelationship
 *
 * @summary delete a ServiceGroupMemberRelationship
 * x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Delete.json
 */
async function serviceGroupMemberRelationshipsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  await client.serviceGroupMemberRelationships.delete(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "sg1",
  );
}

async function main() {
  await serviceGroupMemberRelationshipsDelete();
}

main().catch(console.error);
