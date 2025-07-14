// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a firmware analysis workspace.
 *
 * @summary the operation to delete a firmware analysis workspace.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Delete_MaximumSet_Gen.json
 */
async function workspacesDeleteMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  await client.workspaces.delete("rgiotfirmwaredefense", "exampleWorkspaceName");
}

/**
 * This sample demonstrates how to the operation to delete a firmware analysis workspace.
 *
 * @summary the operation to delete a firmware analysis workspace.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Delete_MinimumSet_Gen.json
 */
async function workspacesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5443A01A-5242-4950-AC1A-2DD362180254";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  await client.workspaces.delete("rgworkspaces", "E___-3");
}

async function main() {
  await workspacesDeleteMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesDeleteMinimumSetGen();
}

main().catch(console.error);
