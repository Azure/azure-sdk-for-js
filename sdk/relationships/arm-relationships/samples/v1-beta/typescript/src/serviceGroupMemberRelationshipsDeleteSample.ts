// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ServiceGroupMemberRelationship
 *
 * @summary delete a ServiceGroupMemberRelationship
 * x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Delete.json
 */
async function serviceGroupMemberRelationshipsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  await client.serviceGroupMemberRelationships.delete(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "sg1",
  );
}

async function main(): Promise<void> {
  await serviceGroupMemberRelationshipsDelete();
}

main().catch(console.error);
