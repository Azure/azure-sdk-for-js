// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the result of a static site async operation.
 *
 * @summary gets the result of a static site async operation.
 * x-ms-original-file: 2026-03-15/GetStaticSiteOperationResult.json
 */
async function getsTheResultOfAStaticSiteAsyncOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSitesAsyncOperations.getOperationResult(
    "West US",
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab5d5",
  );
}

async function main(): Promise<void> {
  await getsTheResultOfAStaticSiteAsyncOperation();
}

main().catch(console.error);
