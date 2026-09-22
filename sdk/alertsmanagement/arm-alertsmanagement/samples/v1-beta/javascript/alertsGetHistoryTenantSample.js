// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the history of an alert, which captures any monitor condition changes (Fired/Resolved), alert state changes (New/Acknowledged/Closed) and applied action rules for that particular alert.
 *
 * @summary get the history of an alert, which captures any monitor condition changes (Fired/Resolved), alert state changes (New/Acknowledged/Closed) and applied action rules for that particular alert.
 * x-ms-original-file: 2025-05-25-preview/Alerts_GetHistoryTenant.json
 */
async function resolve() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.getHistoryTenant("66114d64-d9d9-478b-95c9-b789d6502100");
  console.log(result);
}

async function main() {
  await resolve();
}

main().catch(console.error);
