// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the python 3 package identified by package name.
 *
 * @summary update the python 3 package identified by package name.
 * x-ms-original-file: 2024-10-23/updatePython3Package.json
 */
async function updateAModule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.python3Package.update(
    "rg",
    "MyAutomationAccount",
    "MyPython3Package",
    { tags: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAModule();
}

main().catch(console.error);
