// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationListResult } from "@azure/arm-mysql";
import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Update a list of configurations in a given server.
 *
 * @summary Update a list of configurations in a given server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2017-12-01/examples/ConfigurationsUpdateByServer.json
 */
async function configurationList(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "mysqltestsvc1";
  const value: ConfigurationListResult = {};
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.serverParameters.beginListUpdateConfigurationsAndWait(
    resourceGroupName,
    serverName,
    value,
  );
  console.log(result);
}

configurationList().catch(console.error);
