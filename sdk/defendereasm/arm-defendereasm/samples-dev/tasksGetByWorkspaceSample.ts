// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a task in the given workspace.
 *
 * @summary Returns a task in the given workspace.
 * x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Tasks_GetByWorkspace.json
 */

import { EasmMgmtClient } from "@azure/arm-defendereasm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tasks(): Promise<void> {
  const subscriptionId =
    process.env["DEFENDEREASM_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEFENDEREASM_RESOURCE_GROUP"] || "dummyrg";
  const workspaceName = "ThisisaWorkspace";
  const taskId = "ThisisaTaskId";
  const credential = new DefaultAzureCredential();
  const client = new EasmMgmtClient(credential, subscriptionId);
  const result = await client.tasks.getByWorkspace(resourceGroupName, workspaceName, taskId);
  console.log(result);
}

async function main(): Promise<void> {
  await tasks();
}

main().catch(console.error);
