// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Detectors
 *
 * @summary description for Get Detectors
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectors.json
 */
async function listAppDetectors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDetectors(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to description for Get Detectors
 *
 * @summary description for Get Detectors
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectorsSlot.json
 */
async function listAppSlotDetectors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDetectors(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "availability",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAppDetectors();
  await listAppSlotDetectors();
}

main().catch(console.error);
