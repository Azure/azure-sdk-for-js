// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for List Site Detector Responses
 *
 * @summary description for List Site Detector Responses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectorResponsesSlot_Slot.json
 */
async function getAppSlotDetectorResponses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDetectorResponsesSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "staging",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to description for List Site Detector Responses
 *
 * @summary description for List Site Detector Responses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectorResponses_Slot.json
 */
async function getAppDetectorResponses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDetectorResponsesSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "staging",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAppSlotDetectorResponses();
  await getAppDetectorResponses();
}

main().catch(console.error);
