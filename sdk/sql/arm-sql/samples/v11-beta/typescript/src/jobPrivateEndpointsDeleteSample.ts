// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint.
 *
 * @summary deletes a private endpoint.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobPrivateEndpoint.json
 */
async function deleteAPrivateEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.jobPrivateEndpoints.delete("group1", "server1", "agent1", "endpoint1");
}

async function main(): Promise<void> {
  await deleteAPrivateEndpoint();
}

main().catch(console.error);
