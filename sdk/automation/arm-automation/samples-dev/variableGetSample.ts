// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve the variable identified by variable name.
 *
 * @summary Retrieve the variable identified by variable name.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/getVariable.json
 */

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAVariable(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "sampleAccount9";
  const variableName = "sampleVariable";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.variableOperations.get(
    resourceGroupName,
    automationAccountName,
    variableName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAVariable();
}

main().catch(console.error);
