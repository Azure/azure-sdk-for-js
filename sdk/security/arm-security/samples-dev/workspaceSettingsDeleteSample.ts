// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the custom workspace settings for this subscription. new VMs will report to the default workspace
 *
 * @summary Deletes the custom workspace settings for this subscription. new VMs will report to the default workspace
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2017-08-01-preview/examples/WorkspaceSettings/DeleteWorkspaceSetting_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAWorkspaceSettingDataForResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const workspaceSettingName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.workspaceSettings.delete(workspaceSettingName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAWorkspaceSettingDataForResourceGroup();
}

main().catch(console.error);
