// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the BitLocker Keys for all drives in the specified job.
 *
 * @summary Returns the BitLocker Keys for all drives in the specified job.
 * x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListBitLockerKeys.json
 */

import { StorageImportExport } from "@azure/arm-storageimportexport";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBitLockerKeysForDrivesInAJob(): Promise<void> {
  const subscriptionId =
    process.env["STORAGEIMPORTEXPORT_SUBSCRIPTION_ID"] || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const jobName = "myJob";
  const resourceGroupName = process.env["STORAGEIMPORTEXPORT_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new StorageImportExport(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bitLockerKeys.list(jobName, resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listBitLockerKeysForDrivesInAJob();
}

main().catch(console.error);
