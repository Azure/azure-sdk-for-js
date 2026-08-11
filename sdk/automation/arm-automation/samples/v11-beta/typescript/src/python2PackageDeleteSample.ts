// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the python 2 package by name.
 *
 * @summary delete the python 2 package by name.
 * x-ms-original-file: 2024-10-23/deletePython2Package.json
 */
async function deleteAPython2Package(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.python2Package.delete("rg", "myAutomationAccount33", "OmsCompositeResources");
}

async function main(): Promise<void> {
  await deleteAPython2Package();
}

main().catch(console.error);
