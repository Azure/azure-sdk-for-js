// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this enables the user to add notes on this Drill Run.
 *
 * @summary this enables the user to add notes on this Drill Run.
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_AddNotes_MaximumSet_Gen.json
 */
async function drillRunsAddNotesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.addNotes(
    "sampleServiceGroupName",
    "qmn",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
    { notes: "wubqjajveatmwcglo" },
  );
}

async function main() {
  await drillRunsAddNotesMaximumSet();
}

main().catch(console.error);
