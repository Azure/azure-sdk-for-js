// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a URL for uploading a firmware image.
 *
 * @summary generate a URL for uploading a firmware image.
 * x-ms-original-file: 2025-08-02/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json
 */
async function workspacesGenerateUploadUrlMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.generateUploadUrl(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    { firmwareId: "00000000-0000-0000-0000-000000000000" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generate a URL for uploading a firmware image.
 *
 * @summary generate a URL for uploading a firmware image.
 * x-ms-original-file: 2025-08-02/Workspaces_GenerateUploadUrl_MinimumSet_Gen.json
 */
async function workspacesGenerateUploadUrlMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.generateUploadUrl("rgworkspaces", "default", {
    firmwareId: "00000000-0000-0000-0000-000000000000",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGenerateUploadUrlMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesGenerateUploadUrlMinimumSetGen();
}

main().catch(console.error);
