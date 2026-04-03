// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ServiceGroupMemberRelationship
 *
 * @summary get a ServiceGroupMemberRelationship
 * x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_Get.json
 */
async function serviceGroupMemberRelationshipsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const result = await client.serviceGroupMemberRelationships.get(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "sg1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serviceGroupMemberRelationshipsGet();
}

main().catch(console.error);
