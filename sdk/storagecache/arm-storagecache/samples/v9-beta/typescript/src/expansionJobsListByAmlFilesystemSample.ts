// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all the expansion jobs the user has access to under an AML File System.
 *
 * @summary returns all the expansion jobs the user has access to under an AML File System.
 * x-ms-original-file: 2026-01-01/expansionJobs_ListByAmlFilesystem.json
 */
async function expansionJobsListByAmlFilesystem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expansionJobs.listByAmlFilesystem("scgroup", "fs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await expansionJobsListByAmlFilesystem();
}

main().catch(console.error);
