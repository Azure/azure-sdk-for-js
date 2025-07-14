// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the firmware analysis workspaces in the specified resource group.
 *
 * @summary lists all of the firmware analysis workspaces in the specified resource group.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_ListByResourceGroup_MaximumSet_Gen.json
 */
async function workspacesListByResourceGroupMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
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
 * x-ms-original-file: 2025-04-01-preview/Workspaces_ListByResourceGroup_MinimumSet_Gen.json
 */
async function workspacesListByResourceGroupMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup("rgiotfirmwaredefense")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListByResourceGroupMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await workspacesListByResourceGroupMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
