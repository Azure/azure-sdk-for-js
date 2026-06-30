// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicepreparedimagespecification";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the tags of a prepared image specification.
 *
 * @summary update the tags of a prepared image specification.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_Update.json
 */
async function preparedImageSpecificationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.preparedImageSpecifications.update(
    "rg1",
    "my-prepared-image-specification",
    { tags: { key5558: "xufgvdnarflvwbcdkmhqhgbop" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await preparedImageSpecificationsUpdate();
}

main().catch(console.error);
