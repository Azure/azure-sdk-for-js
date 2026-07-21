// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Runtime Environment
 *
 * @summary create or update Runtime Environment
 * x-ms-original-file: 2024-10-23/runtimeEnvironment/createRuntimeEnvironment.json
 */
async function createOrUpdateAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runtimeEnvironments.create(
    "rg",
    "myAutomationAccount9",
    "myRuntimeEnvironmentName",
    {
      location: "East US 2",
      defaultPackages: { Az: "12.3.0" },
      runtime: { version: "7.4", language: "PowerShell" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAutomationAccount();
}

main().catch(console.error);
