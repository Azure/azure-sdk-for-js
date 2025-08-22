// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List workspaces.
 *
 * @summary List workspaces.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/Workspace_ListByResourceGroup.json
 */

import type { WorkspacesListByResourceGroupOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workspaceListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const pageSize = 10;
  const isDescending = true;
  const initialSkip = 0;
  const options: WorkspacesListByResourceGroupOptionalParams = {
    pageSize,
    isDescending,
    initialSkip,
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup(resourceGroupName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await workspaceListByResourceGroup();
}

main().catch(console.error);
