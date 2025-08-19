// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates part of an Azure Monitor Workspace
 *
 * @summary Updates part of an Azure Monitor Workspace
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Monitor/stable/2023-04-03/examples/AzureMonitorWorkspacesUpdate.json
 */

import type {
  AzureMonitorWorkspaceResourceForUpdate,
  AzureMonitorWorkspacesUpdateOptionalParams,
} from "@azure/arm-monitor";
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAnAzureMonitorWorkspace(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const resourceGroupName = process.env["MONITOR_RESOURCE_GROUP"] || "myResourceGroup";
  const azureMonitorWorkspaceName = "myAzureMonitorWorkspace";
  const azureMonitorWorkspaceProperties: AzureMonitorWorkspaceResourceForUpdate = {
    tags: { tag1: "A", tag2: "B", tag3: "C" },
  };
  const options: AzureMonitorWorkspacesUpdateOptionalParams = {
    azureMonitorWorkspaceProperties,
  };
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.azureMonitorWorkspaces.update(
    resourceGroupName,
    azureMonitorWorkspaceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnAzureMonitorWorkspace();
}

main().catch(console.error);
