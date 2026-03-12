// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a firmware analysis workspace.
 *
 * @summary the operation to delete a firmware analysis workspace.
 * x-ms-original-file: 2025-08-02/Workspaces_Delete_MaximumSet_Gen.json
 */
async function workspacesDeleteMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  await client.workspaces.delete("rgiotfirmwaredefense", "exampleWorkspaceName");
}

/**
 * This sample demonstrates how to the operation to delete a firmware analysis workspace.
 *
 * @summary the operation to delete a firmware analysis workspace.
 * x-ms-original-file: 2025-08-02/Workspaces_Delete_MinimumSet_Gen.json
 */
async function workspacesDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  await client.workspaces.delete("rgworkspaces", "default");
}

async function main(): Promise<void> {
  await workspacesDeleteMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesDeleteMinimumSetGen();
}

main().catch(console.error);
