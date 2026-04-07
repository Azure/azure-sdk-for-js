// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server connection policy
 *
 * @summary gets a server connection policy
 * x-ms-original-file: 2025-02-01-preview/ServerConnectionPoliciesGet.json
 */
async function getsAServerConnectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverConnectionPolicies.get(
    "rgtest-12",
    "servertest-6285",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAServerConnectionPolicy();
}

main().catch(console.error);
