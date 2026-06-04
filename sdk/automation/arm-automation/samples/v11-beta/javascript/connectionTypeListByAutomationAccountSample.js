// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of connection types.
 *
 * @summary retrieve a list of connection types.
 * x-ms-original-file: 2024-10-23/getAllConnectionTypes_First100.json
 */
async function getConnectionTypesFirst100() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectionType.listByAutomationAccount(
    "rg",
    "myAutomationAccount25",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of connection types.
 *
 * @summary retrieve a list of connection types.
 * x-ms-original-file: 2024-10-23/getAllConnectionTypes_Next100.json
 */
async function getConnectionTypesNext100() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectionType.listByAutomationAccount(
    "rg",
    "myAutomationAccount25",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getConnectionTypesFirst100();
  await getConnectionTypesNext100();
}

main().catch(console.error);
