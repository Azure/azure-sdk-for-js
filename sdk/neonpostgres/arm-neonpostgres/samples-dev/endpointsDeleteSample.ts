// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Endpoint
 *
 * @summary delete a Endpoint
 * x-ms-original-file: 2025-03-01/Endpoints_Delete_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function endpointsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.endpoints.delete("rgneon", "test-org", "entity-name", "entity-name", "entity-name");
}

async function main(): Promise<void> {
  await endpointsDeleteMaximumSet();
}

main().catch(console.error);
