// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to detach VNet on a server.
 *
 * @summary detach VNet on a server.
 * x-ms-original-file: 2024-12-30/ServerDetachVNet.json
 */
async function detachVNetOnAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.detachVNet("TestGroup", "testserver", {
    publicNetworkAccess: "Enabled",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await detachVNetOnAServer();
}

main().catch(console.error);
