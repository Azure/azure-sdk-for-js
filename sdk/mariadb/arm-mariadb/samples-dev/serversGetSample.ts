// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about a server.
 *
 * @summary Gets information about a server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/ServerGet.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function serverGet(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "mariadbtestsvc4";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

serverGet().catch(console.error);
