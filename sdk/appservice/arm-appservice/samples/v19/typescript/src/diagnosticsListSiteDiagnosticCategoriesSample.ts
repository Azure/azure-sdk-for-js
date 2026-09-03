// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get Diagnostics Categories
 *
 * @summary description for Get Diagnostics Categories
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDiagnosticCategories.json
 */
async function listAppDiagnosticCategories(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDiagnosticCategories(
    "Sample-WestUSResourceGroup",
    "SampleApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to description for Get Diagnostics Categories
 *
 * @summary description for Get Diagnostics Categories
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDiagnosticCategoriesSlot.json
 */
async function listAppSlotDiagnosticCategories(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDiagnosticCategories(
    "Sample-WestUSResourceGroup",
    "SampleApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppDiagnosticCategories();
  await listAppSlotDiagnosticCategories();
}

main().catch(console.error);
