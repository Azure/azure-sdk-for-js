// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a ScriptExecution
 *
 * @summary delete a ScriptExecution
 * x-ms-original-file: 2024-09-01/ScriptExecutions_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function scriptExecutionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.scriptExecutions.delete("group1", "cloud1", "addSsoServer");
}

async function main(): Promise<void> {
  await scriptExecutionsDelete();
}

main().catch(console.error);
