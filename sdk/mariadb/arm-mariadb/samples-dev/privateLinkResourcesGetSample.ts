// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets a private link resource for MariaDB server.
 *
 * @summary Gets a private link resource for MariaDB server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/PrivateLinkResourcesGet.json
 */
async function getsAPrivateLinkResourceForMariaDb(): Promise<void> {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = "Default";
  const serverName = "test-svr";
  const groupName = "plr";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(resourceGroupName, serverName, groupName);
  console.log(result);
}

getsAPrivateLinkResourceForMariaDb().catch(console.error);
