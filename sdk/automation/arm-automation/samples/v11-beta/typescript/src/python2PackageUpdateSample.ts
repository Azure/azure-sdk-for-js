// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the python 2 package identified by package name.
 *
 * @summary update the python 2 package identified by package name.
 * x-ms-original-file: 2024-10-23/updatePython2Package.json
 */
async function updateAModule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.python2Package.update(
    "rg",
    "MyAutomationAccount",
    "MyPython2Package",
    { tags: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAModule();
}

main().catch(console.error);
