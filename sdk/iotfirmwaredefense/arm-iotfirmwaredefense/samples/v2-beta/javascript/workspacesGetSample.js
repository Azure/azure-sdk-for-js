// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get firmware analysis workspace.
 *
 * @summary get firmware analysis workspace.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Get_MaximumSet_Gen.json
 */
async function workspacesGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.get("rgiotfirmwaredefense", "exampleWorkspaceName");
  console.log(result);
}

/**
 * This sample demonstrates how to get firmware analysis workspace.
 *
 * @summary get firmware analysis workspace.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Get_MinimumSet_Gen.json
 */
async function workspacesGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9781B4B5-0922-472A-80F0-B743D0596694";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.get("rgworkspaces", "E_US");
  console.log(result);
}

async function main() {
  await workspacesGetMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesGetMinimumSetGen();
}

main().catch(console.error);
