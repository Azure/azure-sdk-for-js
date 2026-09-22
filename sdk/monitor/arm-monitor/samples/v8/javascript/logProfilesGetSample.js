// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the log profile.
 *
 * @summary gets the log profile.
 * x-ms-original-file: 2016-03-01/getLogProfile.json
 */
async function getLogProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "df602c9c-7aa0-407d-a6fb-eb20c8bd1192";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.logProfiles.get("default");
  console.log(result);
}

async function main() {
  await getLogProfile();
}

main().catch(console.error);
