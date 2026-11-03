// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available Automation REST API operations.
 *
 * @summary lists all of the available Automation REST API operations.
 * x-ms-original-file: 2024-10-23/listRestAPIOperations.json
 */
async function listsAllOfTheAvailableAutomationRestAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableAutomationRestAPIOperations();
}

main().catch(console.error);
