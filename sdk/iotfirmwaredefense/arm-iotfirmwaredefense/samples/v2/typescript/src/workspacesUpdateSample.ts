// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a firmware analysis workspaces.
 *
 * @summary the operation to update a firmware analysis workspaces.
 * x-ms-original-file: 2025-08-02/Workspaces_Update_MaximumSet_Gen.json
 */
async function workspacesUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
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
async function workspacesUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgworkspaces", "WorkspaceName", {});
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesUpdateMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesUpdateMinimumSetGen();
}

main().catch(console.error);
