// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get site detector response
 *
 * @summary description for Get site detector response
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDetectorResponseSlot_Slot.json
 */
async function getAppSlotDetectorResponse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDetectorResponseSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "runtimeavailability",
    "staging",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to description for Get site detector response
 *
 * @summary description for Get site detector response
 * x-ms-original-file: 2025-05-01/Diagnostics_GetSiteDetectorResponse_Slot.json
 */
async function getAppDetectorResponse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getSiteDetectorResponseSlot(
    "Sample-WestUSResourceGroup",
    "SampleApp",
    "runtimeavailability",
    "staging",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAppSlotDetectorResponse();
  await getAppDetectorResponse();
}

main().catch(console.error);
