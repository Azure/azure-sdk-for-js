// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this generates, or regenerates, the report for this Drill Run. The action is idempotent and is safe to call at any time: a call that arrives while a generation is already running joins it, and a call made after a failed attempt retries it. A report that has been finalized is never regenerated.
 *
 * @summary this generates, or regenerates, the report for this Drill Run. The action is idempotent and is safe to call at any time: a call that arrives while a generation is already running joins it, and a call made after a failed attempt retries it. A report that has been finalized is never regenerated.
 * x-ms-original-file: 2026-08-31-preview/DrillRuns_GenerateReport_MaximumSet_Gen.json
 */
async function drillRunsGenerateReportMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.generateReport(
    "sampleServiceGroupName",
    "qmn",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
  );
}

async function main() {
  await drillRunsGenerateReportMaximumSet();
}

main().catch(console.error);
