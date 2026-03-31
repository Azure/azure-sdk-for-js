// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Azure Web Category.
 *
 * @summary gets the specified Azure Web Category.
 * x-ms-original-file: 2025-05-01/AzureWebCategoryGet.json
 */
async function getAzureWebCategoryByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4de8428a-4a92-4cea-90ff-b47128b8cab8";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.webCategories.get("Arts");
  console.log(result);
}

async function main(): Promise<void> {
  await getAzureWebCategoryByName();
}

main().catch(console.error);
