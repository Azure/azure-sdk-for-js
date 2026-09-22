// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an auto import job.
 *
 * @summary create or update an auto import job.
 * x-ms-original-file: 2026-01-01/autoImportJobs_CreateOrUpdate.json
 */
async function autoImportJobsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoImportJobs.createOrUpdate("scgroup", "fs1", "autojob1", {
    location: "eastus",
    adminStatus: "Enable",
    autoImportPrefixes: ["/"],
    conflictResolutionMode: "Skip",
    enableDeletions: false,
    maximumErrors: 0,
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main() {
  await autoImportJobsCreateOrUpdate();
}

main().catch(console.error);
