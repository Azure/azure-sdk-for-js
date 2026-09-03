// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-alertsmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the enrichments of an alert. It returns a collection of one object named default.
 *
 * @summary get the enrichments of an alert. It returns a collection of one object named default.
 * x-ms-original-file: 2025-05-25-preview/Alerts_GetEnrichments.json
 */
async function resolve(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.alerts.getEnrichments(
    "subscriptions/72fa99ef-9c84-4a7c-b343-ec62da107d81",
    "66114d64-d9d9-478b-95c9-b789d6502101",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await resolve();
}

main().catch(console.error);
