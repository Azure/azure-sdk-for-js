// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by parent
 *
 * @summary list by parent
 * x-ms-original-file: 2026-03-15/HardwareSettings_ListByParent_MaximumSet_Gen.json
 */
async function hardwareSettingsListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "AFEEE483-435F-4E9C-8742-4B550746CD70";
  const client = new EdgeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hardwareSettings.listByParent(
    "rgdisconnectedOperations",
    "demo-resource",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await hardwareSettingsListByParentMaximumSet();
}

main().catch(console.error);
