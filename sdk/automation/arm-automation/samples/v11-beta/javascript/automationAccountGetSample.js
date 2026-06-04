// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about an Automation Account.
 *
 * @summary get information about an Automation Account.
 * x-ms-original-file: 2024-10-23/getAutomationAccount.json
 */
async function getAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.automationAccount.get("rg", "myAutomationAccount9");
  console.log(result);
}

async function main() {
  await getAutomationAccount();
}

main().catch(console.error);
