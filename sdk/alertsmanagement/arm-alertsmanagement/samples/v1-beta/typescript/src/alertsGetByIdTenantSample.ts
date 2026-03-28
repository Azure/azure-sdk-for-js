// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-alertsmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get information related to a specific alert.
 *
 * @summary get information related to a specific alert.
 * x-ms-original-file: 2025-05-25-preview/Alerts_GetByIdTenant.json
 */
async function getById(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.getByIdTenant("66114d64-d9d9-478b-95c9-b789d6502100");
  console.log(result);
}

async function main(): Promise<void> {
  await getById();
}

main().catch(console.error);
