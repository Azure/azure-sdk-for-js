// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of credentials.
 *
 * @summary retrieve a list of credentials.
 * x-ms-original-file: 2024-10-23/listCredentialsByAutomationAccount.json
 */
async function listCredentialsByAutomationAccountFirst100() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.credential.listByAutomationAccount(
    "rg",
    "myAutomationAccount20",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of credentials.
 *
 * @summary retrieve a list of credentials.
 * x-ms-original-file: 2024-10-23/listCredentialsByAutomationAccount_next100_using_nextLink.json
 */
async function listCredentialsByAutomationAccountNext100() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.credential.listByAutomationAccount(
    "rg",
    "myAutomationAccount20",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCredentialsByAutomationAccountFirst100();
  await listCredentialsByAutomationAccountNext100();
}

main().catch(console.error);
