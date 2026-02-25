// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Execute Detector
 *
 * @summary Description for Execute Detector
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/Diagnostics_ExecuteSiteDetector.json
 */
async function executeSiteDetector(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const siteName = "SampleApp";
  const detectorName = "sitecrashes";
  const diagnosticCategory = "availability";
  const slot = "Production";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.executeSiteDetectorSlot(
    resourceGroupName,
    siteName,
    detectorName,
    diagnosticCategory,
    slot,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Description for Execute Detector
 *
 * @summary Description for Execute Detector
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/Diagnostics_ExecuteSiteDetectorSlot.json
 */
async function executeSiteSlotDetector(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const siteName = "SampleApp";
  const detectorName = "sitecrashes";
  const diagnosticCategory = "availability";
  const slot = "staging";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.executeSiteDetectorSlot(
    resourceGroupName,
    siteName,
    detectorName,
    diagnosticCategory,
    slot,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeSiteDetector();
  await executeSiteSlotDetector();
}

main().catch(console.error);
