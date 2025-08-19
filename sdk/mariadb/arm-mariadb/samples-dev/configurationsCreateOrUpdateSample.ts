// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Configuration } from "@azure/arm-mariadb";
import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates a configuration of a server.
 *
 * @summary Updates a configuration of a server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/ConfigurationCreateOrUpdate.json
 */
async function configurationCreateOrUpdate(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const configurationName = "event_scheduler";
  const parameters: Configuration = { source: "user-override", value: "off" };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.configurations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    configurationName,
    parameters,
  );
  console.log(result);
}

configurationCreateOrUpdate().catch(console.error);
