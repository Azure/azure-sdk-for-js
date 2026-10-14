// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Image
 *
 * @summary create a Image
 * x-ms-original-file: 2024-04-01/PutImage.json
 */
async function imageCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.images.createOrUpdate(
    "MyResourceGroup1",
    "MyCatalog1",
    "00000000-0000-0000-0000-000000000000",
    { properties: { image: "bXliYXNlNjRzdHJpbmc=" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await imageCreateOrUpdate();
}

main().catch(console.error);
