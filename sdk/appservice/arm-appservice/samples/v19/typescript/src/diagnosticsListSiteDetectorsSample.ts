// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get Detectors
 *
 * @summary description for Get Detectors
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectors.json
 */
async function listAppDetectors(): Promise<void> {
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
async function listAppSlotDetectors(): Promise<void> {
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

async function main(): Promise<void> {
  await listAppDetectors();
  await listAppSlotDetectors();
}

main().catch(console.error);
