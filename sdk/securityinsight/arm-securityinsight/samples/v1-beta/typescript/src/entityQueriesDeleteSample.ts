// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the entity query.
 *
 * @summary delete the entity query.
 * x-ms-original-file: 2025-07-01-preview/entityQueries/DeleteEntityQuery.json
 */
async function deleteAnEntityQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.entityQueries.delete("myRg", "myWorkspace", "07da3cc8-c8ad-4710-a44e-334cdcb7882b");
}

async function main(): Promise<void> {
  await deleteAnEntityQuery();
}

main().catch(console.error);
