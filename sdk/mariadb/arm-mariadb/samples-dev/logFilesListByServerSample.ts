// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the log files in a given server.
 *
 * @summary List all the log files in a given server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/LogFileListByServer.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function logFileList(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logFiles.listByServer(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

logFileList().catch(console.error);
