// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Compute
 *
 * @summary delete a Compute
 * x-ms-original-file: 2025-03-01/Computes_Delete_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function computesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.computes.delete("rgneon", "test-org", "entity-name", "entity-name", "entity-name");
}

async function main(): Promise<void> {
  await computesDeleteMaximumSet();
}

main().catch(console.error);
