// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get Diagnostics Category
 *
 * @summary description for Get Diagnostics Category
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDiagnosticCategorySlot_Slot.json
 */
async function getAppSlotDiagnosticCategory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDiagnosticCategorySlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "staging",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to description for Get Diagnostics Category
 *
 * @summary description for Get Diagnostics Category
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDiagnosticCategory_Slot.json
 */
async function getAppDiagnosticCategory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDiagnosticCategorySlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "Production",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAppSlotDiagnosticCategory();
  await getAppDiagnosticCategory();
}

main().catch(console.error);
