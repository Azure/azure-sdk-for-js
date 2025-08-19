// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve a list of accounts within a given subscription.
 *
 * @summary Retrieve a list of accounts within a given subscription.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2021-06-22/examples/listAutomationAccountsBySubscription.json
 */

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAutomationAccountsByResourceGroup(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.automationAccountOperations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutomationAccountsByResourceGroup();
}

main().catch(console.error);
