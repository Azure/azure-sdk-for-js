// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of a static site async operation.
 *
 * @summary gets the status of a static site async operation.
 * x-ms-original-file: 2026-03-15/GetStaticSiteOperationStatus.json
 */
async function getsTheStatusOfAStaticSiteAsyncOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSitesAsyncOperations.getOperationStatus(
    "West US",
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab5d5",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheStatusOfAStaticSiteAsyncOperation();
}

main().catch(console.error);
