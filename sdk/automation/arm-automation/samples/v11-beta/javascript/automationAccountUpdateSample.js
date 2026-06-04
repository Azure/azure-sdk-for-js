// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an automation account.
 *
 * @summary update an automation account.
 * x-ms-original-file: 2024-10-23/updateAutomationAccount.json
 */
async function updateAnAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.automationAccount.update("rg", "myAutomationAccount9", {
    name: "myAutomationAccount9",
    location: "East US 2",
    sku: { name: "Free" },
  });
  console.log(result);
}

async function main() {
  await updateAnAutomationAccount();
}

main().catch(console.error);
