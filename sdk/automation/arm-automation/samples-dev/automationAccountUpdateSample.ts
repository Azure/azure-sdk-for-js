// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an automation account.
 *
 * @summary Update an automation account.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2021-06-22/examples/updateAutomationAccount.json
 */

import type { AutomationAccountUpdateParameters } from "@azure/arm-automation";
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAnAutomationAccount(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "myAutomationAccount9";
  const parameters: AutomationAccountUpdateParameters = {
    name: "myAutomationAccount9",
    location: "East US 2",
    sku: { name: "Free" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.automationAccountOperations.update(
    resourceGroupName,
    automationAccountName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnAutomationAccount();
}

main().catch(console.error);
