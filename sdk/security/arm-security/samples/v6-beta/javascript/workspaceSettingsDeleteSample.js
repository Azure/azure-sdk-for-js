// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the custom workspace settings for this subscription. new VMs will report to the default workspace
 *
 * @summary deletes the custom workspace settings for this subscription. new VMs will report to the default workspace
 * x-ms-original-file: 2017-08-01-preview/WorkspaceSettings/DeleteWorkspaceSetting_example.json
 */
async function deleteAWorkspaceSettingDataForResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.workspaceSettings.delete("default");
}

async function main() {
  await deleteAWorkspaceSettingDataForResourceGroup();
}

main().catch(console.error);
