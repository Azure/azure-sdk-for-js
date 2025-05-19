// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTFirmwareDefenseClient } = require("@azure/arm-iotfirmwaredefense");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a firmware analysis workspace.
 *
 * @summary the operation to create or update a firmware analysis workspace.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Create_MaximumSet_Gen.json
 */
async function workspacesCreateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.create("rgiotfirmwaredefense", "exampleWorkspaceName", {
    properties: {},
    tags: { key4630: "rov" },
    location: "emiscxuo",
    sku: {
      name: "pb",
      tier: "Free",
      size: "unh",
      family: "fwsu",
      capacity: 22,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a firmware analysis workspace.
 *
 * @summary the operation to create or update a firmware analysis workspace.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Create_MinimumSet_Gen.json
 */
async function workspacesCreateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5443A01A-5242-4950-AC1A-2DD362180254";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.create("rgworkspaces", "E___-3", {
    properties: {},
    location: "emiscxuo",
  });
  console.log(result);
}

async function main() {
  await workspacesCreateMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesCreateMinimumSetGen();
}

main().catch(console.error);
