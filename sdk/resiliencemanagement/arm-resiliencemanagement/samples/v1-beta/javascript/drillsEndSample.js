// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this ends the currently running instance of the Drill.
 *
 * @summary this ends the currently running instance of the Drill.
 * x-ms-original-file: 2026-04-01-preview/Drills_End_MaximumSet_Gen.json
 */
async function drillsEndMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.end("sampleServiceGroupName", "qmn", "drill1", {
    attestation: "Success",
    attestationNotes: "ycnqvrgduotohgycsapckhixwqwgp",
  });
}

async function main() {
  await drillsEndMaximumSet();
}

main().catch(console.error);
