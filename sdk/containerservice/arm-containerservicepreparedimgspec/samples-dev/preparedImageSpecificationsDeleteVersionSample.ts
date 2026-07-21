// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicepreparedimgspec";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a prepared image specification version. This operation will be blocked if the prepared image specification version is in use.
 *
 * @summary delete a prepared image specification version. This operation will be blocked if the prepared image specification version is in use.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_DeleteVersion.json
 */
async function preparedImageSpecificationsDeleteVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.preparedImageSpecifications.deleteVersion(
    "rg1",
    "my-prepared-image-specification",
    "20250101-abcd1234",
  );
}

async function main(): Promise<void> {
  await preparedImageSpecificationsDeleteVersion();
}

main().catch(console.error);
