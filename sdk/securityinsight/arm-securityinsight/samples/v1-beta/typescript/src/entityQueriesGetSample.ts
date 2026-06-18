// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an entity query.
 *
 * @summary gets an entity query.
 * x-ms-original-file: 2025-07-01-preview/entityQueries/GetActivityEntityQueryById.json
 */
async function getAnActivityEntityQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entityQueries.get(
    "myRg",
    "myWorkspace",
    "07da3cc8-c8ad-4710-a44e-334cdcb7882b",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an entity query.
 *
 * @summary gets an entity query.
 * x-ms-original-file: 2025-07-01-preview/entityQueries/GetExpansionEntityQueryById.json
 */
async function getAnExpansionEntityQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entityQueries.get(
    "myRg",
    "myWorkspace",
    "07da3cc8-c8ad-4710-a44e-334cdcb7882b",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnActivityEntityQuery();
  await getAnExpansionEntityQuery();
}

main().catch(console.error);
