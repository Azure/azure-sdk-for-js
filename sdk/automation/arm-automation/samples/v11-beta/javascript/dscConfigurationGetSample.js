// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the configuration identified by configuration name.
 *
 * @summary retrieve the configuration identified by configuration name.
 * x-ms-original-file: 2024-10-23/getDscConfiguration.json
 */
async function getADSCConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscConfiguration.get("rg", "myAutomationAccount33", "TemplateBasic");
  console.log(result);
}

async function main() {
  await getADSCConfiguration();
}

main().catch(console.error);
