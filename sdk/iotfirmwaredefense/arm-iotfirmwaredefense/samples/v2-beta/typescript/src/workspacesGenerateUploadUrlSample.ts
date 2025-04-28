// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a URL for uploading a firmware image.
 *
 * @summary generate a URL for uploading a firmware image.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json
 */
async function workspacesGenerateUploadUrlMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.generateUploadUrl(
    "rgiotfirmwaredefense",
    "exampleWorkspaceName",
    { firmwareId: "ktnnf" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generate a URL for uploading a firmware image.
 *
 * @summary generate a URL for uploading a firmware image.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_GenerateUploadUrl_MinimumSet_Gen.json
 */
async function workspacesGenerateUploadUrlMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5443A01A-5242-4950-AC1A-2DD362180254";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const result = await client.workspaces.generateUploadUrl("rgworkspaces", "E___-3", {
    firmwareId: "ktnnf",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGenerateUploadUrlMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesGenerateUploadUrlMinimumSetGen();
}

main().catch(console.error);
