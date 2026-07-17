// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a single software update configuration Run by Id.
 *
 * @summary get a single software update configuration Run by Id.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfigurationRun/getSoftwareUpdateConfigurationRunById.json
 */
async function getSoftwareUpdateConfigurationRunsById() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurationRuns.getById(
    "mygroup",
    "myaccount",
    "2bd77cfa-2e9c-41b4-a45b-684a77cfeca9",
  );
  console.log(result);
}

async function main() {
  await getSoftwareUpdateConfigurationRunsById();
}

main().catch(console.error);
