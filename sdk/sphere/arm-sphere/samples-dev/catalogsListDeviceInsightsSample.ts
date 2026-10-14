// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists device insights for catalog.
 *
 * @summary lists device insights for catalog.
 * x-ms-original-file: 2024-04-01/PostListDeviceInsightsCatalog.json
 */
async function catalogsListDeviceInsights(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.catalogs.listDeviceInsights("MyResourceGroup1", "MyCatalog1", {
    top: 10,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await catalogsListDeviceInsights();
}

main().catch(console.error);
