// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a firmware analysis workspaces.
 *
 * @summary the operation to update a firmware analysis workspaces.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Update_MaximumSet_Gen.json
 */
async function workspacesUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgiotfirmwaredefense", "exampleWorkspaceName", {
    tags: {},
    sku: {
      name: "jmlbmmdyyxoreypd",
      tier: "Free",
      size: "rkoairmk",
      family: "jcrsluqmbovznq",
      capacity: 3,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update a firmware analysis workspaces.
 *
 * @summary the operation to update a firmware analysis workspaces.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_Update_MinimumSet_Gen.json
 */
async function workspacesUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5443A01A-5242-4950-AC1A-2DD362180254";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgworkspaces", "E___-3", {});
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesUpdateMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesUpdateMinimumSetGen();
}

main().catch(console.error);
