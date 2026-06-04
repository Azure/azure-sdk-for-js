// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the source control.
 *
 * @summary delete the source control.
 * x-ms-original-file: 2024-10-23/sourceControl/deleteSourceControl.json
 */
async function deleteASourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.sourceControl.delete("rg", "sampleAccount9", "sampleSourceControl");
}

async function main(): Promise<void> {
  await deleteASourceControl();
}

main().catch(console.error);
