// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the configuration identified by configuration name.
 *
 * @summary create the configuration identified by configuration name.
 * x-ms-original-file: 2024-10-23/updateDscConfiguration.json
 */
async function createOrUpdateConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscConfigurationOperations.update(
    "rg",
    "myAutomationAccount18",
    "SetupServer",
    { parameters: { name: "SetupServer", tags: { Hello: "World" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateConfiguration();
}

main().catch(console.error);
