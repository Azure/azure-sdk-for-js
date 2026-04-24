// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Execute Analysis
 *
 * @summary description for Execute Analysis
 * x-ms-original-file: 2025-05-01/Diagnostics_ExecuteSiteAnalysis.json
 */
async function executeSiteAnalysis(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.executeSiteAnalysis(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "apprestartanalyses",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to description for Execute Analysis
 *
 * @summary description for Execute Analysis
 * x-ms-original-file: 2025-05-01/Diagnostics_ExecuteSiteAnalysisSlot.json
 */
async function executeSiteSlotAnalysis(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.executeSiteAnalysis(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "apprestartanalyses",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeSiteAnalysis();
  await executeSiteSlotAnalysis();
}

main().catch(console.error);
