// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reject sharing of a tenant-level shared gallery.
 *
 * @summary reject sharing of a tenant-level shared gallery.
 * x-ms-original-file: 2025-12-03/tenantLevelSharedGalleryInviteExamples/TenantLevelSharedGalleryInvite_Reject.json
 */
async function rejectAGallerySharedToTenant() {
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential);
  await client.tenantLevelSharedGalleryInvites.tenantLevelGallerySharingReject(
    "{location}",
    "480fd389-260b-41aa-bad9-0a83107c370c",
    "originalGalleryName",
  );
}

async function main() {
  await rejectAGallerySharedToTenant();
}

main().catch(console.error);
