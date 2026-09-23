// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to accept sharing of a tenant-level shared gallery.
 *
 * @summary accept sharing of a tenant-level shared gallery.
 * x-ms-original-file: 2025-12-03/tenantLevelSharedGalleryInviteExamples/TenantLevelSharedGalleryInvite_Accept.json
 */
async function acceptAGallerySharedToTenant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential);
  await client.tenantLevelSharedGalleryInvites.tenantLevelGallerySharingAccept(
    "{location}",
    "480fd389-260b-41aa-bad9-0a83107c370c",
    "originalGalleryName",
  );
}

async function main(): Promise<void> {
  await acceptAGallerySharedToTenant();
}

main().catch(console.error);
