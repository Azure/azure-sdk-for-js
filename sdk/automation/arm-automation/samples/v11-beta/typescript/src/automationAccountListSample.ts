// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of accounts within a given subscription.
 *
 * @summary retrieve a list of accounts within a given subscription.
 * x-ms-original-file: 2024-10-23/listAutomationAccountsBySubscription.json
 */
async function listAutomationAccountsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.automationAccount.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutomationAccountsByResourceGroup();
}

main().catch(console.error);
