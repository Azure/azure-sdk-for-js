// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the applications in the specified account.
 *
 * @summary lists all of the applications in the specified account.
 * x-ms-original-file: 2025-06-01/ApplicationList.json
 */
async function applicationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.application.list("default-azurebatch-japaneast", "sampleacct")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await applicationList();
}

main().catch(console.error);
