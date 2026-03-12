// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GalleryScript} from "@azure/arm-compute";
import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a Gallery Script Definition. Gallery scripts allow the storage, sharing and reuse of common scripts
 *
 * @summary Create or update a Gallery Script Definition. Gallery scripts allow the storage, sharing and reuse of common scripts
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScript_Create.json
 */
async function createOrUpdateASimpleGalleryScript(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryScriptName = "myGalleryScriptName";
  const galleryScript: GalleryScript = {
    location: "West US",
    properties: {
      description: "This is the gallery script description.",
      eula: "This is the gallery script EULA.",
      privacyStatementUri: "{myPrivacyStatementUri}",
      releaseNoteUri: "{myReleaseNoteUri}",
      supportedOSType: "Windows",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScripts.beginCreateOrUpdateAndWait(
    resourceGroupName,
    galleryName,
    galleryScriptName,
    galleryScript,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryScript();
}

main().catch(console.error);
