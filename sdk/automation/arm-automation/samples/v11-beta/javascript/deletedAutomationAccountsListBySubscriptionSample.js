// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve deleted automation account.
 *
 * @summary retrieve deleted automation account.
 * x-ms-original-file: 2024-10-23/getDeletedAutomationAccount.json
 */
async function getDeletedAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.deletedAutomationAccounts.listBySubscription();
  console.log(result);
}

async function main() {
  await getDeletedAutomationAccount();
}

main().catch(console.error);
