// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the application packages in the specified application.
 *
 * @summary lists all of the application packages in the specified application.
 * x-ms-original-file: 2025-06-01/ApplicationPackageList.json
 */
async function applicationPackageList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationPackage.list(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await applicationPackageList();
}

main().catch(console.error);
