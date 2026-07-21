// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of runbooks.
 *
 * @summary retrieve a list of runbooks.
 * x-ms-original-file: 2024-10-23/runbook/listRunbooksByAutomationAccount.json
 */
async function listRunbooksByAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.runbookOperations.listByAutomationAccount(
    "rg",
    "ContoseAutomationAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRunbooksByAutomationAccount();
}

main().catch(console.error);
