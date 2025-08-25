// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a firmware analysis workspace.
 *
 * @summary the operation to create or update a firmware analysis workspace.
 * x-ms-original-file: 2025-08-02/Workspaces_Create_MaximumSet_Gen.json
 */
async function workspacesCreateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.create("rgiotfirmwaredefense", "exampleWorkspaceName", {
    properties: {},
    tags: { key4630: "rov" },
    location: "East US",
    sku: {
      name: "Free",
      tier: "Free",
      size: "Free",
      family: "F",
      capacity: 30,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a firmware analysis workspace.
 *
 * @summary the operation to create or update a firmware analysis workspace.
 * x-ms-original-file: 2025-08-02/Workspaces_Create_MinimumSet_Gen.json
 */
async function workspacesCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.create("rgworkspaces", "exampleWorkspaceName", {
    properties: {},
    location: "East US",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesCreateMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesCreateMinimumSetGen();
}

main().catch(console.error);
