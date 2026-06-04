// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the connection.
 *
 * @summary delete the connection.
 * x-ms-original-file: 2024-10-23/deleteConnection.json
 */
async function deleteAnExistingConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.connection.delete("rg", "myAutomationAccount28", "myConnection");
}

async function main(): Promise<void> {
  await deleteAnExistingConnection();
}

main().catch(console.error);
