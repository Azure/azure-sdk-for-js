// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the firmware analysis workspaces in the specified resource group.
 *
 * @summary lists all of the firmware analysis workspaces in the specified resource group.
 * x-ms-original-file: 2025-08-02/Workspaces_ListByResourceGroup_MaximumSet_Gen.json
 */
async function workspacesListByResourceGroupMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup("rgiotfirmwaredefense")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the firmware analysis workspaces in the specified resource group.
 *
 * @summary lists all of the firmware analysis workspaces in the specified resource group.
 * x-ms-original-file: 2025-08-02/Workspaces_ListByResourceGroup_MinimumSet_Gen.json
 */
async function workspacesListByResourceGroupMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup("rgiotfirmwaredefense")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacesListByResourceGroupMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesListByResourceGroupMinimumSet();
}

main().catch(console.error);
