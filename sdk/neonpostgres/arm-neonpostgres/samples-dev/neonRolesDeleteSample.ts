// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a NeonRole
 *
 * @summary delete a NeonRole
 * x-ms-original-file: 2025-03-01/NeonRoles_Delete_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function neonRolesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.neonRoles.delete("rgneon", "test-org", "entity-name", "entity-name", "entity-name");
}

async function main(): Promise<void> {
  await neonRolesDeleteMaximumSet();
}

main().catch(console.error);
