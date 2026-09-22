// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for List Site Detector Responses
 *
 * @summary description for List Site Detector Responses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectorResponses.json
 */
async function getAppDetectorResponses(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDetectorResponses(
    "Sample-WestUSResourceGroup",
    "SampleApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to description for List Site Detector Responses
 *
 * @summary description for List Site Detector Responses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListSiteDetectorResponsesSlot.json
 */
async function getAppSlotDetectorResponses(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteDetectorResponses(
    "Sample-WestUSResourceGroup",
    "SampleApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAppDetectorResponses();
  await getAppSlotDetectorResponses();
}

main().catch(console.error);
