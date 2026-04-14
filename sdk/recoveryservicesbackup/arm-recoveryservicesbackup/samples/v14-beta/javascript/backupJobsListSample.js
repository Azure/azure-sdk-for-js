// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides a pageable list of jobs.
 *
 * @summary provides a pageable list of jobs.
 * x-ms-original-file: 2026-01-01-preview/Common/ListJobs.json
 */
async function listAllJobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupJobs.list("NetSDKTestRsVault", "SwaggerTestRg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to provides a pageable list of jobs.
 *
 * @summary provides a pageable list of jobs.
 * x-ms-original-file: 2026-01-01-preview/Common/ListJobsWithAllSupportedFilters.json
 */
async function listJobsWithFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupJobs.list("NetSDKTestRsVault", "SwaggerTestRg", {
    filter:
      "startTime eq '2016-01-01 00:00:00 AM' and endTime eq '2017-11-29 00:00:00 AM' and operation eq 'Backup' and backupManagementType eq 'AzureIaasVM' and status eq 'InProgress'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to provides a pageable list of jobs.
 *
 * @summary provides a pageable list of jobs.
 * x-ms-original-file: 2026-01-01-preview/Common/ListJobsWithStartTimeAndEndTimeFilters.json
 */
async function listJobsWithTimeFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupJobs.list("NetSDKTestRsVault", "SwaggerTestRg", {
    filter: "startTime eq '2016-01-01 00:00:00 AM' and endTime eq '2017-11-29 00:00:00 AM'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllJobs();
  await listJobsWithFilters();
  await listJobsWithTimeFilter();
}

main().catch(console.error);
