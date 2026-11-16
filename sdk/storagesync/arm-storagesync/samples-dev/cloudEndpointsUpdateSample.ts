// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch a given CloudEndpoint.
 *
 * @summary patch a given CloudEndpoint.
 * x-ms-original-file: 2025-12-01/CloudEndpoints_Update.json
 */
async function cloudEndpointsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11071075-D90D-4F53-B814-AF8F9B5C39D2";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.cloudEndpoints.update(
    "rgstoragesync",
    "llg",
    "wwuoouzucgvfrsvjfgsobajg",
    "mjpalurfyrwkmqeygi",
    { properties: { changeEnumerationIntervalDays: 14 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cloudEndpointsUpdate();
}

main().catch(console.error);
