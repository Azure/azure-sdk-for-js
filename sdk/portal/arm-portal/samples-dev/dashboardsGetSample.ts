// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the Dashboard.
 *
 * @summary Gets the Dashboard.
 * x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/getDashboard.json
 */

import { Portal } from "@azure/arm-portal";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getADashboard(): Promise<void> {
  const subscriptionId =
    process.env["PORTAL_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["PORTAL_RESOURCE_GROUP"] || "testRG";
  const dashboardName = "testDashboard";
  const credential = new DefaultAzureCredential();
  const client = new Portal(credential, subscriptionId);
  const result = await client.dashboards.get(resourceGroupName, dashboardName);
  console.log(result);
}

async function main(): Promise<void> {
  await getADashboard();
}

main().catch(console.error);
