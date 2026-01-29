// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GalleryScriptUpdate} from "@azure/arm-compute";
import {
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a gallery Script Definition.
 *
 * @summary Update a gallery Script Definition.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScript_Update.json
 */
async function updateASimpleGalleryScript(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryScriptName = "myGalleryScriptName";
  const galleryScript: GalleryScriptUpdate = {
    description: "This is the gallery script description.",
    eula: "This is the gallery script EULA.",
    privacyStatementUri: "{myPrivacyStatementUri}",
    releaseNoteUri: "{myReleaseNoteUri}",
    supportedOSType: "Windows",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScripts.beginUpdateAndWait(
    resourceGroupName,
    galleryName,
    galleryScriptName,
    galleryScript,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateASimpleGalleryScript();
}

main().catch(console.error);
