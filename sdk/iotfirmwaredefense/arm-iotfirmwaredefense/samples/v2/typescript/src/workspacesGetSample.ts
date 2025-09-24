// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get firmware analysis workspace.
 *
 * @summary get firmware analysis workspace.
 * x-ms-original-file: 2025-08-02/Workspaces_Get_MaximumSet_Gen.json
 */
async function workspacesGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
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
 * x-ms-original-file: 2025-08-02/Workspaces_Get_MinimumSet_Gen.json
 */
async function workspacesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.get("rgworkspaces", "E_US");
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGetMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesGetMinimumSetGen();
}

main().catch(console.error);
