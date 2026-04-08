// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list database extension. This will return an empty list as it is not supported.
 *
 * @summary list database extension. This will return an empty list as it is not supported.
 * x-ms-original-file: 2025-02-01-preview/ListDatabaseExtensions.json
 */
async function listDatabaseExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7b2515fe-f230-4017-8cf0-695163acab85";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseExtensions.listByDatabase(
    "rg_4007c5a9-b3b0-41e1-bd46-9eef38768a4a",
    "srv_3b67ec2a-519b-43a7-8533-fb62dce3431e",
    "719d8fa4-bf0f-48fc-8cd3-ef40fe6ba1fe",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDatabaseExtensions();
}

main().catch(console.error);
