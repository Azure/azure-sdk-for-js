// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of modules.
 *
 * @summary retrieve a list of modules.
 * x-ms-original-file: 2024-10-23/listModulesByAutomationAccount.json
 */
async function listModulesByAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.module.listByAutomationAccount("rg", "myAutomationAccount33")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listModulesByAutomationAccount();
}

main().catch(console.error);
