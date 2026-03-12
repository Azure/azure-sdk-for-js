// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of firmwares inside a workspace.
 *
 * @summary lists all of firmwares inside a workspace.
 * x-ms-original-file: 2025-08-02/Firmwares_ListByWorkspace_MaximumSet_Gen.json
 */
async function firmwaresListByWorkspaceMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
 * x-ms-original-file: 2025-08-02/Firmwares_ListByWorkspace_MinimumSet_Gen.json
 */
async function firmwaresListByWorkspaceMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firmwares.listByWorkspace("rgworkspaces-firmwares", "A7")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await firmwaresListByWorkspaceMaximumSetGenGeneratedByMaximumSetRule();
  await firmwaresListByWorkspaceMinimumSetGen();
}

main().catch(console.error);
