// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelationshipsClient } from "@azure/arm-relationships";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ServiceGroupMemberRelationship resources by parent
 *
 * @summary list ServiceGroupMemberRelationship resources by parent
 * x-ms-original-file: 2026-08-01/ServiceGroupMemberRelationships_ListByParent.json
 */
async function serviceGroupMemberRelationshipsListByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new RelationshipsClient(credential);
  const resArray = new Array();
  for await (const item of client.serviceGroupMemberRelationships.listByParent(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/testrg/providers/Microsoft.DocumentDb/databaseAccounts/test-db-account",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await serviceGroupMemberRelationshipsListByParent();
}

main().catch(console.error);
