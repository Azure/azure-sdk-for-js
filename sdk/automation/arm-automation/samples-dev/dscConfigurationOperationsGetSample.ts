// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the configuration identified by configuration name.
 *
 * @summary retrieve the configuration identified by configuration name.
 * x-ms-original-file: 2024-10-23/getDscConfiguration.json
 */
async function getADSCConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscConfigurationOperations.get(
    "rg",
    "myAutomationAccount33",
    "TemplateBasic",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADSCConfiguration();
}

main().catch(console.error);
