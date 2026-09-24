// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the log profile.
 *
 * @summary deletes the log profile.
 * x-ms-original-file: 2016-03-01/deleteLogProfile.json
 */
async function deleteLogProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  await client.logProfiles.delete("Rac46PostSwapRG");
}

async function main() {
  await deleteLogProfile();
}

main().catch(console.error);
