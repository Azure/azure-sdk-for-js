// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the Package identified by Package name.
 *
 * @summary retrieve the Package identified by Package name.
 * x-ms-original-file: 2024-10-23/package/getPackage.json
 */
async function getAPackage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.package.get(
    "rg",
    "myAutomationAccount33",
    "runtimeEnvironmentName",
    "OmsCompositeResources",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPackage();
}

main().catch(console.error);
