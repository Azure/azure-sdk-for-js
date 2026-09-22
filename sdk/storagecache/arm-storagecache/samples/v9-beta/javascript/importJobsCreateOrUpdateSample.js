// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an import job.
 *
 * @summary create or update an import job.
 * x-ms-original-file: 2026-01-01/importJobs_CreateOrUpdate.json
 */
async function importJobsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.importJobs.createOrUpdate("scgroup", "fs1", "job1", {
    location: "eastus",
    conflictResolutionMode: "OverwriteAlways",
    importPrefixes: ["/"],
    maximumErrors: 0,
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main() {
  await importJobsCreateOrUpdate();
}

main().catch(console.error);
