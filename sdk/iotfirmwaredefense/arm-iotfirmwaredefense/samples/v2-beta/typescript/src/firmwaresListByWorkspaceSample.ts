// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of firmwares inside a workspace.
 *
 * @summary lists all of firmwares inside a workspace.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_ListByWorkspace_MaximumSet_Gen.json
 */
async function firmwaresListByWorkspaceMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firmwares.listByWorkspace(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of firmwares inside a workspace.
 *
 * @summary lists all of firmwares inside a workspace.
 * x-ms-original-file: 2025-04-01-preview/Firmwares_ListByWorkspace_MinimumSet_Gen.json
 */
async function firmwaresListByWorkspaceMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "685C0C6F-9867-4B1C-A534-AA3A05B54BCE";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firmwares.listByWorkspace("rgworkspaces-firmwares", "A7")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await firmwaresListByWorkspaceMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresListByWorkspaceMinimumSetGen();
}

main().catch(console.error);
