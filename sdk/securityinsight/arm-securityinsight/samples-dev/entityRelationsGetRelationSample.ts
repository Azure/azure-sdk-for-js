// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an entity relation.
 *
 * @summary gets an entity relation.
 * x-ms-original-file: 2025-07-01-preview/entities/relations/GetEntityRelationByName.json
 */
async function getAnEntityRelation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entityRelations.getRelation(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnEntityRelation();
}

main().catch(console.error);
