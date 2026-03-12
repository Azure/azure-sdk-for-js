// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set
 *
 * @summary Settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2017-08-01-preview/examples/WorkspaceSettings/GetWorkspaceSetting_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAWorkspaceSettingOnSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const workspaceSettingName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.workspaceSettings.get(workspaceSettingName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceSettingOnSubscription();
}

main().catch(console.error);
