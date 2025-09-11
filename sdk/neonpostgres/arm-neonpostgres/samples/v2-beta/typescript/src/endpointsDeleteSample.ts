// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Endpoint
 *
 * @summary delete a Endpoint
 * x-ms-original-file: 2025-06-23-preview/Endpoints_Delete_MaximumSet_Gen.json
 */
async function endpointsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  await client.endpoints.delete("rgneon", "myNeonOrg", "myProject", "main", "myEndpoint");
}

async function main(): Promise<void> {
  await endpointsDeleteMaximumSet();
}

main().catch(console.error);
