// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the variable.
 *
 * @summary delete the variable.
 * x-ms-original-file: 2024-10-23/deleteVariable.json
 */
async function deleteAVariable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.variable.delete("rg", "sampleAccount9", "sampleVariable");
}

async function main(): Promise<void> {
  await deleteAVariable();
}

main().catch(console.error);
