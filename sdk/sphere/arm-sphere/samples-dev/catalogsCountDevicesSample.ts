// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to counts devices in catalog.
 *
 * @summary counts devices in catalog.
 * x-ms-original-file: 2024-04-01/PostCountDevicesCatalog.json
 */
async function catalogsCountDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.catalogs.countDevices("MyResourceGroup1", "MyCatalog1");
  console.log(result);
}

async function main(): Promise<void> {
  await catalogsCountDevices();
}

main().catch(console.error);
