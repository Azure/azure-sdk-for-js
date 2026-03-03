// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Site Analyses
 *
 * @summary description for Get Site Analyses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteAnalysesSlot_Slot.json
 */
async function listAppSlotAnalyses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteAnalysesSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "staging",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to description for Get Site Analyses
 *
 * @summary description for Get Site Analyses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteAnalyses_Slot.json
 */
async function listAppAnalyses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteAnalysesSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "Production",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAppSlotAnalyses();
  await listAppAnalyses();
}

main().catch(console.error);
