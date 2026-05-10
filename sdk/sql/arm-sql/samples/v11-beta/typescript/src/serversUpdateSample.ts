// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a server.
 *
 * @summary updates a server.
 * x-ms-original-file: 2025-02-01-preview/ServerUpdate.json
 */
async function updateAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.update("sqlcrudtest-7398", "sqlcrudtest-4645", {
    administratorLogin: "dummylogin",
    administratorLoginPassword: "placeholder",
    isIPv6Enabled: "Enabled",
    publicNetworkAccess: "Disabled",
    restrictOutboundNetworkAccess: "Enabled",
    retentionDays: 7,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAServer();
}

main().catch(console.error);
