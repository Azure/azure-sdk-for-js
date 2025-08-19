// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a specific software update configuration.
 *
 * @summary delete a specific software update configuration.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2019-06-01/examples/softwareUpdateConfiguration/deleteSoftwareUpdateConfiguration.json
 */

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteSoftwareUpdateConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMATION_SUBSCRIPTION_ID"] || "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "mygroup";
  const automationAccountName = "myaccount";
  const softwareUpdateConfigurationName = "mypatch";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurations.delete(
    resourceGroupName,
    automationAccountName,
    softwareUpdateConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSoftwareUpdateConfiguration();
}

main().catch(console.error);
