// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the deleted runbooks for an automation account.
 *
 * @summary retrieve the deleted runbooks for an automation account.
 * x-ms-original-file: 2024-10-23/listAutomationAccountDeletedRunbooks.json
 */
async function getListsOfDeletedRunbooksInAnAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.automationAccountOperations.listDeletedRunbooks(
    "rg",
    "MyAutomationAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getListsOfDeletedRunbooksInAnAutomationAccount();
}

main().catch(console.error);
