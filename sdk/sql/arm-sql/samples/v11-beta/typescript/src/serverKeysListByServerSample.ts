// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of server keys.
 *
 * @summary gets a list of server keys.
 * x-ms-original-file: 2025-02-01-preview/ServerKeyList.json
 */
async function listTheServerKeysByServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverKeys.listByServer("sqlcrudtest-7398", "sqlcrudtest-4645")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheServerKeysByServer();
}

main().catch(console.error);
