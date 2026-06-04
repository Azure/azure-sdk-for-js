// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update automation account.
 *
 * @summary create or update automation account.
 * x-ms-original-file: 2024-10-23/createOrUpdateAutomationAccount.json
 */
async function createOrUpdateAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.automationAccount.createOrUpdate("rg", "myAutomationAccount9", {
    name: "myAutomationAccount9",
    location: "East US 2",
    sku: { name: "Free" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAutomationAccount();
}

main().catch(console.error);
