// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get Site Analysis
 *
 * @summary description for Get Site Analysis
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteAnalysisSlot_Slot.json
 */
async function getAppSlotAnalysis(): Promise<void> {
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
async function getAppAnalysis(): Promise<void> {
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

async function main(): Promise<void> {
  await getAppSlotAnalysis();
  await getAppAnalysis();
}

main().catch(console.error);
