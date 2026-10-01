// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the package by name.
 *
 * @summary delete the package by name.
 * x-ms-original-file: 2024-10-23/package/deletePackage.json
 */
async function deleteAPackage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.package.delete(
    "rg",
    "myAutomationAccount33",
    "runtimeEnvironmentName",
    "OmsCompositeResources",
  );
}

async function main(): Promise<void> {
  await deleteAPackage();
}

main().catch(console.error);
