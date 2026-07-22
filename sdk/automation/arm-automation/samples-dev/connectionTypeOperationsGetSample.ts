// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the connection type identified by connection type name.
 *
 * @summary retrieve the connection type identified by connection type name.
 * x-ms-original-file: 2024-10-23/getConnectionType.json
 */
async function getConnectionType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.connectionTypeOperations.get("rg", "myAutomationAccount22", "myCT");
  console.log(result);
}

async function main(): Promise<void> {
  await getConnectionType();
}

main().catch(console.error);
