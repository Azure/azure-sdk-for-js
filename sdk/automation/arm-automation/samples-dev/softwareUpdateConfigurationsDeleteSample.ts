// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a specific software update configuration.
 *
 * @summary delete a specific software update configuration.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/deleteSoftwareUpdateConfiguration.json
 */
async function deleteSoftwareUpdateConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.softwareUpdateConfigurations.delete("mygroup", "myaccount", "mypatch");
}

async function main(): Promise<void> {
  await deleteSoftwareUpdateConfiguration();
}

main().catch(console.error);
