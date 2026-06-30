// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of variables.
 *
 * @summary retrieve a list of variables.
 * x-ms-original-file: 2024-10-23/listVariables_First100.json
 */
async function listVariablesFirst100(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.variableOperations.listByAutomationAccount(
    "rg",
    "sampleAccount9",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of variables.
 *
 * @summary retrieve a list of variables.
 * x-ms-original-file: 2024-10-23/listVariables_Next100.json
 */
async function listVariablesNext100(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.variableOperations.listByAutomationAccount(
    "rg",
    "sampleAccount9",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVariablesFirst100();
  await listVariablesNext100();
}

main().catch(console.error);
