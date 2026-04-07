// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server trust group.
 *
 * @summary gets a server trust group.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustGroupGet.json
 */
async function getServerTrustGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverTrustGroups.get(
    "Default",
    "Japan East",
    "server-trust-group-test",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getServerTrustGroup();
}

main().catch(console.error);
