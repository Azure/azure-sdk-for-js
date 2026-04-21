// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DependencyOfRelationship
 *
 * @summary delete a DependencyOfRelationship
 * x-ms-original-file: 2023-09-01-preview/DependencyOfRelationships_Delete.json
 */
async function dependencyOfRelationshipsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  await client.dependencyOfRelationships.delete(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "relationshipOne",
  );
}

async function main(): Promise<void> {
  await dependencyOfRelationshipsDelete();
}

main().catch(console.error);
