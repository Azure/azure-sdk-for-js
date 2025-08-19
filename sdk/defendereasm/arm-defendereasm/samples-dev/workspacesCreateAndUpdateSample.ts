// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  WorkspaceResource,
  WorkspacesCreateAndUpdateOptionalParams,
} from "@azure/arm-defendereasm";
import { EasmMgmtClient } from "@azure/arm-defendereasm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a Workspace.
 *
 * @summary Create or update a Workspace.
 * x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_CreateAndUpdate.json
 */
async function workspaces(): Promise<void> {
  const subscriptionId =
    process.env["DEFENDEREASM_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEFENDEREASM_RESOURCE_GROUP"] || "dummyrg";
  const workspaceName = "ThisisaWorkspace";
  const workspaceResource: WorkspaceResource = { location: "West US" };
  const options: WorkspacesCreateAndUpdateOptionalParams = {
    workspaceResource,
  };
  const credential = new DefaultAzureCredential();
  const client = new EasmMgmtClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateAndUpdateAndWait(
    resourceGroupName,
    workspaceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspaces();
}

main().catch(console.error);
