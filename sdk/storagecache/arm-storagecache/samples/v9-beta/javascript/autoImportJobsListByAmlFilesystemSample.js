// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all the auto import jobs the user has access to under an AML File System.
 *
 * @summary returns all the auto import jobs the user has access to under an AML File System.
 * x-ms-original-file: 2026-01-01/autoImportJobs_ListByAmlFilesystem.json
 */
async function autoImportJobsListByAmlFilesystem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoImportJobs.listByAmlFilesystem("scgroup", "fs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await autoImportJobsListByAmlFilesystem();
}

main().catch(console.error);
