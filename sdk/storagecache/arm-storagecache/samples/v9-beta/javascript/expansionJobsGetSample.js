// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns an expansion job.
 *
 * @summary returns an expansion job.
 * x-ms-original-file: 2026-01-01/expansionJobs_Get.json
 */
async function expansionJobsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.expansionJobs.get("scgroup", "fs1", "expansionjob1");
  console.log(result);
}

async function main() {
  await expansionJobsGet();
}

main().catch(console.error);
