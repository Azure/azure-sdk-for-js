// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of loggers in the specified workspace.
 *
 * @summary lists a collection of loggers in the specified workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceLoggers.json
 */
async function apiManagementListWorkspaceLoggers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceLogger.listByWorkspace("rg1", "apimService1", "wks1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceLoggers();
}

main().catch(console.error);
