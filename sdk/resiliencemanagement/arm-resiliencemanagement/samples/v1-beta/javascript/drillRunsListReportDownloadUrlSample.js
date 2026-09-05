// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this returns a short-lived, read-only URL to download the report for this Drill Run. The URL expires at the returned expiryTimestamp and grants access to that single report only.
 *
 * @summary this returns a short-lived, read-only URL to download the report for this Drill Run. The URL expires at the returned expiryTimestamp and grants access to that single report only.
 * x-ms-original-file: 2026-08-31-preview/DrillRuns_ListReportDownloadUrl_MaximumSet_Gen.json
 */
async function drillRunsListReportDownloadUrlMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.listReportDownloadUrl(
    "sampleServiceGroupName",
    "3f2b1c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
    { format: "Html" },
  );
}

async function main() {
  await drillRunsListReportDownloadUrlMaximumSet();
}

main().catch(console.error);
