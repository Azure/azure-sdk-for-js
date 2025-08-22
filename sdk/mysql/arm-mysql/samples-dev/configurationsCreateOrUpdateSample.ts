// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a configuration of a server.
 *
 * @summary Updates a configuration of a server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2017-12-01/examples/ConfigurationCreateOrUpdate.json
 */

import type { Configuration } from "@azure/arm-mysql";
import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function configurationCreateOrUpdate(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const configurationName = "event_scheduler";
  const parameters: Configuration = { source: "user-override", value: "off" };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.configurations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    configurationName,
    parameters,
  );
  console.log(result);
}

configurationCreateOrUpdate().catch(console.error);
