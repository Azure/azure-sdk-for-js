// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Site Analysis
 *
 * @summary description for Get Site Analysis
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteAnalysisSlot_Slot.json
 */
async function getAppSlotAnalysis() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteAnalysisSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "appanalysis",
    "staging",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to description for Get Site Analysis
 *
 * @summary description for Get Site Analysis
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteAnalysis_Slot.json
 */
async function getAppAnalysis() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteAnalysisSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "appanalysis",
    "Production",
  );
  console.log(result);
}

async function main() {
  await getAppSlotAnalysis();
  await getAppAnalysis();
}

main().catch(console.error);
