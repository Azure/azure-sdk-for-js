// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ServiceGroupMemberRelationship
 *
 * @summary create a ServiceGroupMemberRelationship
 * x-ms-original-file: 2023-09-01-preview/ServiceGroupMemberRelationships_CreateOrUpdate.json
 */
async function serviceGroupMemberRelationshipsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const result = await client.serviceGroupMemberRelationships.createOrUpdate(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
    "sg1",
    {
      properties: {
        targetId: "/providers/Microsoft.Management/serviceGroups/sg1",
        targetTenant: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serviceGroupMemberRelationshipsCreateOrUpdate();
}

main().catch(console.error);
