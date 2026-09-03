// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-alertsmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list alerts meta data information based on value of identifier parameter.
 *
 * @summary list alerts meta data information based on value of identifier parameter.
 * x-ms-original-file: 2025-05-25-preview/AlertsMetaData_MonitorService.json
 */
async function monService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.metaData("MonitorServiceList");
  console.log(result);
}

async function main(): Promise<void> {
  await monService();
}

main().catch(console.error);
