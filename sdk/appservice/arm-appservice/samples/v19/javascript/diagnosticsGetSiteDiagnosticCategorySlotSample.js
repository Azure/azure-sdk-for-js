// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Diagnostics Category
 *
 * @summary description for Get Diagnostics Category
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDiagnosticCategorySlot_Slot.json
 */
async function getAppSlotDiagnosticCategory() {
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
async function getAppDiagnosticCategory() {
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

async function main() {
  await getAppSlotDiagnosticCategory();
  await getAppDiagnosticCategory();
}

main().catch(console.error);
