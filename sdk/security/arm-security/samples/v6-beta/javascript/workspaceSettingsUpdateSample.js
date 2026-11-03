// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to settings about where we should store your security data and logs
 *
 * @summary settings about where we should store your security data and logs
 * x-ms-original-file: 2017-08-01-preview/WorkspaceSettings/UpdateWorkspaceSetting_example.json
 */
async function updateAWorkspaceSettingDataForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.workspaceSettings.update("default", {
    scope: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    workspaceId:
      "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg/providers/Microsoft.OperationalInsights/workspaces/myWorkspace",
  });
  console.log(result);
}

async function main() {
  await updateAWorkspaceSettingDataForSubscription();
}

main().catch(console.error);
