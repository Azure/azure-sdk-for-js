// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a workspace.
 *
 * @summary Update a workspace.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/Workspace_Update.json
 */

import type {
  WorkspacePatch,
  WorkspacesUpdateOptionalParams,
} from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workspaceUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const workspaceName = "workspace1";
  const workspace: WorkspacePatch = {
    description: "des1",
    friendlyName: "friendly",
    tags: { tag1: "value1", tag2: "value2" },
  };
  const options: WorkspacesUpdateOptionalParams = { workspace };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.workspaces.update(resourceGroupName, workspaceName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await workspaceUpdate();
}

main().catch(console.error);
