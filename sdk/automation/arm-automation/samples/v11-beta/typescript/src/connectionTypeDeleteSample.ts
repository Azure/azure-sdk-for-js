// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the connection type.
 *
 * @summary delete the connection type.
 * x-ms-original-file: 2024-10-23/deleteConnectionType.json
 */
async function deleteAnExistingConnectionType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.connectionType.delete("rg", "myAutomationAccount22", "myCT");
}

async function main(): Promise<void> {
  await deleteAnExistingConnectionType();
}

main().catch(console.error);
