// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a server connection policy
 *
 * @summary updates a server connection policy
 * x-ms-original-file: 2025-02-01-preview/ServerConnectionPoliciesUpdate.json
 */
async function updatesAServerConnectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverConnectionPolicies.createOrUpdate(
    "testrg",
    "testserver",
    "default",
    { connectionType: "Redirect" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAServerConnectionPolicy();
}

main().catch(console.error);
