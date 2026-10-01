// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a specific software update configuration.
 *
 * @summary delete a specific software update configuration.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/deleteSoftwareUpdateConfiguration.json
 */
async function deleteSoftwareUpdateConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.softwareUpdateConfigurations.delete("mygroup", "myaccount", "mypatch");
}

async function main() {
  await deleteSoftwareUpdateConfiguration();
}

main().catch(console.error);
