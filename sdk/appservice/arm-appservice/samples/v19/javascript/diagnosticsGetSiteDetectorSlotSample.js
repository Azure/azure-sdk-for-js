// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Detector
 *
 * @summary description for Get Detector
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDetectorSlot_Slot.json
 */
async function getAppSlotDetector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDetectorSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "sitecrashes",
    "staging",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to description for Get Detector
 *
 * @summary description for Get Detector
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDetector_Slot.json
 */
async function getAppDetector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDetectorSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "sitecrashes",
    "Production",
  );
  console.log(result);
}

async function main() {
  await getAppSlotDetector();
  await getAppDetector();
}

main().catch(console.error);
