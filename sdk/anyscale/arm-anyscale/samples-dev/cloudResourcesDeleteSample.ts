// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a cloud resource
 *
 * @summary delete a cloud resource
 * x-ms-original-file: 2026-09-01/CloudResources_Delete.json
 */
async function cloudResourcesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.cloudResources.delete("rganyscale", "AnyscaleCloud", "AnyscaleCloudResource");
}

async function main(): Promise<void> {
  await cloudResourcesDelete();
}

main().catch(console.error);
