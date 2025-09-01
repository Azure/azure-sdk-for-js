// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a firmware analysis workspaces.
 *
 * @summary the operation to update a firmware analysis workspaces.
 * x-ms-original-file: 2025-08-02/Workspaces_Update_MaximumSet_Gen.json
 */
async function workspacesUpdateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgiotfirmwaredefense", "exampleWorkspaceName", {
    tags: {},
    sku: {
      name: "Free",
      tier: "Free",
      size: "Free",
      family: "Free",
      capacity: 25,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update a firmware analysis workspaces.
 *
 * @summary the operation to update a firmware analysis workspaces.
 * x-ms-original-file: 2025-08-02/Workspaces_Update_MinimumSet_Gen.json
 */
async function workspacesUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgworkspaces", "WorkspaceName", {});
  console.log(result);
}

async function main() {
  await workspacesUpdateMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesUpdateMinimumSetGen();
}

main().catch(console.error);
