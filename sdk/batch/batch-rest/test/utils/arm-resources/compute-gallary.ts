// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { Gallery, GalleryInVMAccessControlProfileVersion } from "@azure/arm-compute";
import { ComputeManagementClient } from "@azure/arm-compute";
import { getLocation, getResourceGroupName, getSubscriptionId } from "./env-const.js";

export async function createComputeGallery(galleryName: string): Promise<Gallery> {
  const client = new ComputeManagementClient(createTestCredential(), getSubscriptionId());
  const gallery = await client.galleries.beginCreateOrUpdateAndWait(
    getResourceGroupName(),
    galleryName,
    {
      location: getLocation(),
    },
  );
  return gallery;
}

export async function deleteComputeGallery(galleryName: string): Promise<void> {
  const client = new ComputeManagementClient(createTestCredential(), getSubscriptionId());
  await client.galleries.beginDeleteAndWait(getResourceGroupName(), galleryName);
}

export async function createVmAccessProfileVersion(
  galleryName: string,
  profileName: string,
  versionName?: string,
): Promise<GalleryInVMAccessControlProfileVersion> {
  const client = new ComputeManagementClient(createTestCredential(), getSubscriptionId());

  await client.galleryInVMAccessControlProfiles.beginCreateOrUpdateAndWait(
    getResourceGroupName(),
    galleryName,
    profileName,
    {
      location: getLocation(),
      properties: {
        applicableHostEndpoint: "IMDS",
        osType: "Windows",
      },
    },
  );

  const version = await client.galleryInVMAccessControlProfileVersions.beginCreateOrUpdateAndWait(
    getResourceGroupName(),
    galleryName,
    profileName,
    versionName || "1.0.0",
    {
      location: getLocation(),
    },
  );
  return version;
}
