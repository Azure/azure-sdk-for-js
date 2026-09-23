// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reject sharing of a subscription-level shared gallery.
 *
 * @summary reject sharing of a subscription-level shared gallery.
 * x-ms-original-file: 2025-12-03/sharedGalleryInviteExamples/SharedGalleryInvite_Reject.json
 */
async function rejectAGallerySharedToSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.sharedGalleryInvites.gallerySharingReject(
    "{location}",
    "480fd389-260b-41aa-bad9-0a83107c370c",
    "originalGalleryName",
  );
}

async function main() {
  await rejectAGallerySharedToSubscription();
}

main().catch(console.error);
