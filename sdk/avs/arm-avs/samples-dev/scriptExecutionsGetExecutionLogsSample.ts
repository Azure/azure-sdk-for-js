// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to return the logs for a script execution resource
 *
 * @summary return the logs for a script execution resource
 * x-ms-original-file: 2024-09-01/ScriptExecutions_GetExecutionLogs.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function scriptExecutionsGetExecutionLogs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptExecutions.getExecutionLogs(
    "group1",
    "cloud1",
    "addSsoServer",
    { scriptOutputStreamType: ["Information", "Warnings", "Errors", "Output"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scriptExecutionsGetExecutionLogs();
}

main().catch(console.error);
