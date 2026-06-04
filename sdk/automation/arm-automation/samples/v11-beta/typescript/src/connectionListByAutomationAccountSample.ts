// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of connections.
 *
 * @summary retrieve a list of connections.
 * x-ms-original-file: 2024-10-23/listConnectionsByAutomationAccount_First100.json
 */
async function listConnectionsByAutomationAccountFirst100(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connection.listByAutomationAccount(
    "rg",
    "myAutomationAccount28",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of connections.
 *
 * @summary retrieve a list of connections.
 * x-ms-original-file: 2024-10-23/listConnectionsByAutomationAccount_Next100.json
 */
async function listConnectionsByAutomationAccountNext100(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connection.listByAutomationAccount(
    "rg",
    "myAutomationAccount28",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectionsByAutomationAccountFirst100();
  await listConnectionsByAutomationAccountNext100();
}

main().catch(console.error);
