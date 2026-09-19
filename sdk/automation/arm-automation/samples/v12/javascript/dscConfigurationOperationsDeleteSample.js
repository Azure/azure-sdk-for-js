// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the dsc configuration identified by configuration name.
 *
 * @summary delete the dsc configuration identified by configuration name.
 * x-ms-original-file: 2024-10-23/deleteDscConfiguration.json
 */
async function deleteDSCConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.dscConfigurationOperations.delete("rg", "myAutomationAccount33", "TemplateBasic");
}

async function main() {
  await deleteDSCConfiguration();
}

main().catch(console.error);
