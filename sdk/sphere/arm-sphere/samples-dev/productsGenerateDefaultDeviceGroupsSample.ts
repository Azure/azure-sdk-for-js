// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @summary generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 * x-ms-original-file: 2024-04-01/PostGenerateDefaultDeviceGroups.json
 */
async function productsGenerateDefaultDeviceGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.products.generateDefaultDeviceGroups(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await productsGenerateDefaultDeviceGroups();
}

main().catch(console.error);
