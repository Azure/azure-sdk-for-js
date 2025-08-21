// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Get Site Analyses
 *
 * @summary Description for Get Site Analyses
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/Diagnostics_ListSiteAnalyses.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAppAnalyses(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const siteName = "SampleApp";
  const diagnosticCategory = "availability";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteAnalyses(
    resourceGroupName,
    siteName,
    diagnosticCategory,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Description for Get Site Analyses
 *
 * @summary Description for Get Site Analyses
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/Diagnostics_ListSiteAnalysesSlot.json
 */
async function listAppSlotAnalyses(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const siteName = "SampleApp";
  const diagnosticCategory = "availability";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listSiteAnalyses(
    resourceGroupName,
    siteName,
    diagnosticCategory,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppAnalyses();
  await listAppSlotAnalyses();
}

main().catch(console.error);
