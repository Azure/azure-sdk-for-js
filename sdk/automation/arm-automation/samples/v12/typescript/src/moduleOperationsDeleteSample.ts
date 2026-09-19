// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the module by name.
 *
 * @summary delete the module by name.
 * x-ms-original-file: 2024-10-23/deleteModule.json
 */
async function deleteAModule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.moduleOperations.delete("rg", "myAutomationAccount33", "OmsCompositeResources");
}

async function main(): Promise<void> {
  await deleteAModule();
}

main().catch(console.error);
