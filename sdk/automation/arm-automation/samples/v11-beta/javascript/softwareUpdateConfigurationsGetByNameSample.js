// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a single software update configuration by name.
 *
 * @summary get a single software update configuration by name.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/getSoftwareUpdateConfigurationByName.json
 */
async function getSoftwareUpdateConfigurationByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurations.getByName(
    "mygroup",
    "myaccount",
    "mypatch",
  );
  console.log(result);
}

async function main() {
  await getSoftwareUpdateConfigurationByName();
}

main().catch(console.error);
