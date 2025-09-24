// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ScriptExecution
 *
 * @summary get a ScriptExecution
 * x-ms-original-file: 2024-09-01/ScriptExecutions_Get.json
 */
async function scriptExecutionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptExecutions.get("group1", "cloud1", "addSsoServer");
  console.log(result);
}

async function main(): Promise<void> {
  await scriptExecutionsGet();
}

main().catch(console.error);
