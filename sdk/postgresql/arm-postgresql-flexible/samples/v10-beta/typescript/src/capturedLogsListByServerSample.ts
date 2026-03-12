// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all captured logs for download in a server.
 *
 * @summary lists all captured logs for download in a server.
 * x-ms-original-file: 2026-01-01-preview/CapturedLogsListByServer.json
 */
async function listAllCapturedLogsForDownloadInAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capturedLogs.listByServer(
    "exampleresourcegroup",
    "exampleserver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllCapturedLogsForDownloadInAServer();
}

main().catch(console.error);
