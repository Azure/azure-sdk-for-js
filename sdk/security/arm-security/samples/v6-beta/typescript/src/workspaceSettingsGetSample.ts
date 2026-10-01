// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set
 *
 * @summary settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set
 * x-ms-original-file: 2017-08-01-preview/WorkspaceSettings/GetWorkspaceSetting_example.json
 */
async function getAWorkspaceSettingOnSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.workspaceSettings.get("default");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceSettingOnSubscription();
}

main().catch(console.error);
