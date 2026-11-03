// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Detector
 *
 * @summary description for Get Detector
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDetector.json
 */
async function getAppDetector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDetector(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "sitecrashes",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to description for Get Detector
 *
 * @summary description for Get Detector
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDetectorSlot.json
 */
async function getAppSlotDetector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDetector(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
    "sitecrashes",
  );
  console.log(result);
}

async function main() {
  await getAppDetector();
  await getAppSlotDetector();
}

main().catch(console.error);
