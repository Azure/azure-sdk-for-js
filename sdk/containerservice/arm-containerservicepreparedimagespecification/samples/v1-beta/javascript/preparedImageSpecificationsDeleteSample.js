// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicepreparedimagespecification");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a prepared image specification. This operation will be blocked if the resource is in use.
 *
 * @summary delete a prepared image specification. This operation will be blocked if the resource is in use.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_Delete.json
 */
async function preparedImageSpecificationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.preparedImageSpecifications.delete("rg1", "my-prepared-image-specification");
}

async function main() {
  await preparedImageSpecificationsDelete();
}

main().catch(console.error);
