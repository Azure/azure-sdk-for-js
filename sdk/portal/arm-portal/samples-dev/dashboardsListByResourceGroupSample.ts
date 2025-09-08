// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the Dashboards within a resource group.
 *
 * @summary Gets all the Dashboards within a resource group.
 * x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/listDashboardsByResourceGroup.json
 */

import { Portal } from "@azure/arm-portal";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllCustomResourceProvidersOnTheResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["PORTAL_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["PORTAL_RESOURCE_GROUP"] || "testRG";
  const credential = new DefaultAzureCredential();
  const client = new Portal(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dashboards.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllCustomResourceProvidersOnTheResourceGroup();
}

main().catch(console.error);
