// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a server trust group.
 *
 * @summary deletes a server trust group.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustGroupDelete.json
 */
async function dropServerTrustGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.serverTrustGroups.delete("Default", "Japan East", "server-trust-group-test");
}

async function main(): Promise<void> {
  await dropServerTrustGroup();
}

main().catch(console.error);
